import {questions, establishmentQuestion, professionalsQuestion, servicesQuestion } from '../../config/messages.js';
import { getAvaliabledSchedules, createSchedule } from '../../api/api'
const state = ()=>{
    return {
        renderingChat:[],
    }
};

const getters = {

    getEstablishment: (state, getter, rootState, rootGetters) => {        
        return rootGetters['infos/getEstablishment'];
    },

    getSelectedOptions: (state, getter, rootState, rootGetters) => {
        return rootGetters['infos/getOptionsSelected'];
    },

    getChat: (state, getters) => {
        return state.renderingChat;
    }
}

const mutations = {
    pushMessageToRender: (state, payload) => {
        state.renderingChat.push(payload.message);
    },

    pushQuestion: (state, {question, complement=""}) => {
        state.renderingChat.push(questions(question, complement));
    },

    pushAnswer : (state, answer) => {
        let message = {        
            type:'answer',
            data:answer  
        }
        state.renderingChat.push(message)      

    },

    pushInputAnswer : (state, payload) => {
        let message = {
            type:'awnserInput',
            data: payload
        };
        state.renderingChat.push(message);
    },

    removeLastMessage : (state) => {
        state.renderingChat.pop();
    },

    pushEstablishmentSelectQuestion: (state) => {
        const messages = establishmentQuestion();
        state.renderingChat.push(...establishmentQuestion());
    },

    pushProfessionalsSelectQuestion: (state, filial) => {
        const messages = professionalsQuestion(filial.professionals);
        state.renderingChat.push(...messages);
    },

    pushServicesSelectQuestion: (state, services) => {
        const messages = servicesQuestion(services);
        state.renderingChat.push(...messages);
    },

    clear: (state) => {
        state.renderingChat.splice(0,(state.renderingChat.length));
    }
}

const actions = {

    initChat: {
        root: true,
        handler: ({commit, state, getters, dispatch}) => {

            const establishment = getters['getEstablishment'];

            let i = 0;
            let queue =  setInterval(()=>{

                switch(i){
                    case 0: {
                        commit('pushQuestion', {question:'hello', complement:establishment.nomeEstabelecimento});
                        break;
                    }
                    case 1: {
                        commit('pushQuestion', {question:'iHelpYou'});
                        break;
                    }
                    case 2: {
                        if(establishment.hasOwnProperty('filiais')) {
                            commit('pushEstablishmentSelectQuestion');
                            clearInterval(queue);
                            break;
                        } else {
                            dispatch('setSelectedEstablishment', {filial:establishment,hiddenMessage:true});
                        }
                    }

                    default: {
                        clearInterval(queue);
                        break;
                    }
                }

                i++;
            },300)
        }
    },


    setSelectedEstablishment: ({commit, state, dispatch}, {filial, hiddenMessage=false}) => {

        let i = 0

        dispatch('setSelectedOption', {key:'establishment', value:filial }, {root:true});


        const queue = setInterval(()=>{
            switch(i){ 
                case 0: {
                    if(!hiddenMessage) {
                        commit('pushAnswer', filial.nome)
                    }
                    break;
                }
                case 1: {
                    if(filial.professionals.length > 1){
                        commit('pushProfessionalsSelectQuestion', filial);
                    }
                    else{
                        dispatch('setSelectedProfessional', filial.professionals[0])
                    }
                    break;
                }

                default: {
                    clearInterval(queue);
                    break;
                }
            };
            i++;
        },300);
    },


    setSelectedProfessional: ({commit, state, getters, dispatch}, {professional, hiddenMessage=false}) => {
        dispatch('setSelectedOption', {key:'professional', value:professional }, {root:true})
        const { establishment } = getters['getSelectedOptions'];

        let i = 0;
        const queue = setInterval(()=>{
            switch(i) {
                case 0: {
                    if(!hiddenMessage){
                        commit('pushAnswer', professional.nome);
                    }
                    break;
                }
                case 1: {
                    let services = professional.servico.map(id => {
                        return {
                            ...establishment.servico[id],
                            id
                        }
                    });
                    commit('pushServicesSelectQuestion', services );
                    break;
                }

                default :{
                    clearInterval(queue);
                }
            }
            i++;
        }, 300)

    },


    setSelectedService : ({ commit, state, getters, dispatch }, {service, hiddenMessage=false}) => {

        dispatch('setSelectedOption', {key:'service', value:service }, {root:true})

        const { professional } = getters['getSelectedOptions'];
        let i = 0;
        let queue = setInterval(()=>{
            switch(i){
                case 0: {
                    if(!hiddenMessage) {
                        commit('pushAnswer', `${service.titulo} - ${Number(service.valor).toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}`);
                    }
                    break;

                }
                case 1: {
                    commit('pushQuestion',{question:"selectDate"});
                    break;
                }

                case 2: {
                    let message = {
                        type:"selectDate",
                        data: professional
                    }
                    commit('pushMessageToRender', {message});
                }

                default: {
                    clearInterval(queue);
                    break;
                }
            }
            i++;
        },300)


    },

    setSelectedDate : async ({commit, state, getters, dispatch}, {date, hiddenMessage=false}) => {
        dispatch('setSelectedOption', {key:'date', value:date }, {root:true});

        const { professional, service, establishment } = getters['getSelectedOptions'];

        const availableSchedules = await getAvaliabledSchedules(professional.uidProfessional, service.id, date.completeDate.toLocaleDateString('pt-br'));

        if(availableSchedules.length > 0) {

            let i = 0;
            let queue = setInterval(()=>{
                switch(i){

                    case 0 :{
                        if(!hiddenMessage){
                        commit('pushAnswer',date.completeDate.toLocaleDateString('pt-br') )
                        }
                        break;
                    }

                    case 1: {
                        commit('pushQuestion',{question:"selectHour"});
                        break;
                    }
                    case 2: {

                        let message = {
                                type:"selectHour",
                                data: availableSchedules
                            }
                        commit('pushMessageToRender', {message});
                        break;
                    }

                    default: {
                        clearInterval(queue);
                        break;
                    }
                }
                i++;
            },300);
        } else {
            let options = establishment.professionals.length > 1 ?
            ['service', 'date', 'professional'] :
            ['service','date'];

            dispatch('returnToSelectOtherOption', {
                options,
                question:"dontHaveHour"
            })
        }



    },

    setSelectedHour : ({commit, getters, dispatch}, hour) => {
        dispatch('setSelectedOption', {key:'hour', value:hour }, {root:true});
        const infos = getters['getSelectedOptions'];
        let i = 0;
        const queue = setInterval(()=> {
            switch(i) {
                case 0 : {
                    commit('pushAnswer', hour.horarioAgendamento);
                    break;
                }

                case 1: {
                    if(!(infos.hasOwnProperty('clientName')) || infos.clientName == "") {
                        commit('pushQuestion', {question:'yourName'});
                    }
                    break;
                }
                case 2: {
                    if(infos.hasOwnProperty('clientName') && infos.clientName !== "") {
                        dispatch('createAppointment');
                    }
                    else {
                        commit('pushInputAnswer', {
                            mask:"",
                            key: 'clientName',
                            dispatch: 'pushPhoneQuestion'
                        });
                    }
                    break;
                }

                default:
                    clearInterval(queue);
                    break;
            }
            i++;
        }, 300)

    },

    submitInput : ({commit, getters, dispatch}, payload) => {
        const { key } = payload;
        let value = payload.hasOwnProperty('rawValue') ?
        payload.rawValue : payload.value;
        dispatch('setSelectedOption', {key, value }, {root:true});

        commit('removeLastMessage');
        let i = 0;

        const queue = setInterval(()=>{
            switch(i) {
                case 0: {
                    commit('pushAnswer', payload.value);
                    break;
                }
                case 1: {                    
                    dispatch(payload.dispatch);
                    break;
                }

                default: {
                    clearInterval(queue);
                    break;
                }
            }

            i++
        }, 300);




    },

    pushPhoneQuestion : ({commit, getters, dispatch}) => {

        let i = 0;
        const queue = setInterval(()=> {
            switch(i){
                case 0: {
                    commit('pushQuestion', {question:'yourPhone'});
                    break;
                }

                case 1: {
                    commit('pushMessageToRender', {message: {
                        type:'answerInputPhone',
                        data:{}
                    } })
                }

                default: {
                    clearInterval(queue);
                    break;
                }
            }
            i++;
        },300)
    },


    createAppointment: ({commit, getters, dispatch}) => {
        const {
                clientName,
                clientPhone,
                date,
                establishment,
                hour,
                professional,
                service 
            } = getters['getSelectedOptions'];
        const appointment = {
            dataReserva: date.completeDate.toLocaleDateString('pt-br'),
            horarioAgendamento: hour.horarioAgendamento,
            idEstabelecimento: establishment.uidEstabelecimento,
            idFuncionario: professional.uidProfessional,
            idServico: Number(service.id),
            nomeCliente: clientName,
            slotReserva: Number(hour.slotReserva),
            status: 10,
            tempo: Number(hour.tempo),
            idCliente:clientPhone,
            recorrencia:false
          };

          let response={};
          createSchedule(appointment)
          .then((data)=>{
            response = data;

          })
          .catch((err)=>console.error(err))
          .finally(()=>{

            if(response.status == 200) {
                let i = 0;
                const queue = setInterval(()=>{
                    switch(i){
                        case 0: {
                            const message = {
                                type:'sucessSchedule',
                                data: {
                                    dataReserva:appointment.dataReserva,
                                    horarioAgendamento: appointment.horarioAgendamento,
                                    nomeCliente: appointment.nomeCliente,
                                    professionalNome: professional.nome,
                                    serviceTitulo: service.titulo,
                                    valor: Number(service.valor).toLocaleString('pt-BR',{style:'currency', currency:'BRL'}),
                                    enderecoCompleto: establishment.enderecoCompleto
                                }
                            }
                            commit('pushMessageToRender',{message});
                            break;
                        }
                        case 1: {
                            const messageSucess = {
                                type:"sucessButton",
                                data: ""
                            }
                            commit('pushMessageToRender',{message:messageSucess});
                            break;
                        }
                        default: {
                            clearInterval(queue);
                            break;
                        }
                    }
                    i++;
                },200)
            } else if(response.status == 422) {
                dispatch('returnToSelectOtherOption', {
                    options:['hour','professional','service'],
                    question:"indisponibleHour"
                })
            }

          })
    },

    returnToSelectOtherOption : ({commit, getters, dispatch}, {options, question}) => {
        let i = 0;
        const queue = setInterval(()=>{
            switch(i) {
                case 0:{
                    commit('pushQuestion', {question});
                    break
                }

                case 1: {
                    let message = {
                        type: "selectOtherOption",
                        data:options
                    }
                    commit('pushMessageToRender', {message})
                    break;
                }

                default: {
                    clearInterval(queue);
                    break;
                }
            }
            i++;
        }, 300)
    },

    setOtherOption: ({commit, getters,dispatch}, opt) => {
        
        const { establishment, professional, service, date } = getters['getSelectedOptions'];
        switch(opt){
            case 'professional': {
                dispatch('setSelectedEstablishment', {filial:establishment, hiddenMessage:true});
                break;
            }
            case 'service' : {
                dispatch('setSelectedProfessional', {professional, hiddenMessage:true} );
                break;
            }
            case 'date' : {
                dispatch('setSelectedService',{service, hiddenMessage:true} );
                break;
            }
            case 'hour' : {
                dispatch('setSelectedDate', {date, hiddenMessage:true})
            }
        }
    },

    restart: ({commit, getters, dispatch}) => {
        commit('clear');
        dispatch('clearOptions',{}, {root:true});
    }
}



export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
  }