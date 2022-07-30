import {questions, establishmentQuestion, professionalsQuestion, servicesQuestion } from '../../config/messages.js';
import { getAvaliabledSchedules } from '../../api/api'
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
        state.renderingChat.push(payload.message)      
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
        state.renderingChat = [];
    }
}

const actions = {

    initChat: {
        root: true,
        handler: ({commit, state, getters}) => {

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
                            clearInterval(queue)
                            break;
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


    setSelectedEstablishment: ({commit, state, dispatch}, filial) => {
        let i = 0


        dispatch('setSelectedOption', {key:'establishment', value:filial }, {root:true})


        let fireChat = setInterval(()=>{
            if(i == 0){
                commit('pushAnswer', filial.nome)
                i++;
            }
            else if(i == 1) {
                commit('pushProfessionalsSelectQuestion', filial)
                i++;
            }
            else {
                clearInterval(fireChat);
            }
        },300)
    },


    setSelectedProfessional: ({commit, state, getters, dispatch}, professional) => {

        dispatch('setSelectedOption', {key:'professional', value:professional }, {root:true})
        const { establishment } = getters['getSelectedOptions'];

        let i = 0;
        const queue = setInterval(()=>{
            switch(i) {
                case 0: {
                    commit('pushAnswer', professional.nome);
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


    setSelectedService : ({ commit, state, getters, dispatch }, service) => {

        dispatch('setSelectedOption', {key:'service', value:service }, {root:true})

        const { professional } = getters['getSelectedOptions'];
        let i = 0;
        let queue = setInterval(()=>{
            switch(i){
                case 0: {
                    commit('pushAnswer', `${service.titulo} - ${Number(service.valor).toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}`);
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

    setSelectedDate : async ({commit, state, getters, dispatch}, date) => {

        dispatch('setSelectedOption', {key:'date', value:date }, {root:true});
        const { professional, service } = getters['getSelectedOptions'];
        
        let i = 0;
        let queue = setInterval(()=>{
            switch(i){

                case 0 :{
                    commit('pushAnswer',date.completeDate.toLocaleDateString('pt-br') )
                    break;
                }

                case 1: {
                    commit('pushQuestion',{question:"selectHour"});
                    break;
                }
                case 2: {
                    (async() => {
                        const availableSchedules = await getAvaliabledSchedules(professional.uidProfessional, service.id, date.completeDate.toLocaleDateString('pt-br'));
                        let message = {
                            type:"selectHour",
                            data: availableSchedules
                        }
                        commit('pushMessageToRender', {message});
                    })()
                    break;
                }

                default: {
                    clearInterval(queue);
                    break;
                }
            }
            i++;
        },300)



    },

    setSelectedHour : ({commit, getter, dispatch}, hour) => {
        dispatch('setSelectedOption', {key:'hour', value:hour }, {root:true});

        let i = 0;
        const queue = setInterval(()=> {
            switch(i) {
                case 0 : {
                    commit('pushAnswer', hour.horarioAgendamento);
                    break;
                }

                case 1: {
                    commit('pushQuestion', {question:'yourName'});
                    break;
                }
                case 2: {
                    commit('pushInputAnswer', {});
                    break;
                }

                default:
                    clearInterval(queue);
                    break;
            }
            i++;
        }, 300)

    },

    submitInput : ({commit, getter, dispatch}, payload) => {
        const { key, value } = payload;
        dispatch('setSelectedOption', {key, value }, {root:true});

        commit('removeLastMessage');
        let i = 0;

        const queue = setInterval(()=>{
            switch(i) {
                case 0: {
                    commit('pushAnswer', value);
                    break;
                }

                default: {
                    clearInterval(queue);
                    break;
                }
            }

            i++
        }, 300);




    }
}



export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
  }