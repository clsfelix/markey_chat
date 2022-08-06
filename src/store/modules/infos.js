import { getEstablishmentService } from '../../api/api'

const state = () => {
    return {
        loadedEstablishment:false,
        establishment:{
            nomeEstabelecimento:'',
            userProfilePicture: ''
        },
        establishmentData:{
            nomeEstabelecimento:'',
            userProfilePicture: ''
        },
        optionsSelected: {}
    }
}


const getters = {
    getEstablishment: (state, getters) =>{
        return state.establishment;
    },
    getEstablishmentData: (state, getters) =>{
        return state.establishmentData;
    },

    getOptionsSelected: (state, getters) => {
        return state.optionsSelected;
    },
    getLoadedEstablishment: (state, getters) => {
        return state.loadedEstablishment;
    }
}


const mutations = {
    updateEstablishmentState: (state, establishment) => {
        state.establishment = establishment
        state.establishmentData = establishment;
    },

    updateEstablishmentData: (state, establishment) => {
        state.establishmentData = establishment;
    },

    setSelectedEstablishment: (state, establishment) => {
        state.optionsSelected.establishment = establishment;
    },

    setSelectedOption: (state, {key, value}) => {
        state.optionsSelected[key] = value
    },

    finallyLoadedEstablishment:(state) => {
        state.loadedEstablishment = true;
    },

    clearOptions: (state) => {
        state.optionsSelected = {};
    }
}

const actions = {
    getEstablishment : async ({ commit, state, dispatch }, iniChat=false)=>{
        try{
            const response = await getEstablishmentService('');
            commit('updateEstablishmentState', response);
            if(iniChat) {
                console.log('here');
                dispatch('initChat', {}, {root:true});
            }
        }
        catch(e) {
            console.error(e);
        }
    },

    setEstablishmentData: {
        root: true,

        handler:({commit, state, dispatch}, establishment)=>{
            commit('updateEstablishmentData', establishment);
        }
    },


    finallyLoadedEstablishment: ({commit, state, dispatch}) => {
        commit('finallyLoadedEstablishment');
        setTimeout(()=>{
            dispatch('initChat', {}, {root:true})}
        ,100)
    },

    clearOptions: {
        root: true,
        handler:({commit, state, dispatch})=>{
            commit('clearOptions');
            dispatch('getEstablishment', true);
            
        }
    },

    setSelectedOptionsEstablishment : {
        root:true,
        handler: ({commit, state, dispatch}, establishment) => {
            commit('setSelectedEstablishment', establishment);
        }
    },

    setSelectedOption : {
        root: true,
        handler: ({commit, state, dispatch}, {key, value}) => {
            commit('setSelectedOption', {key, value})
        }
    }
}




export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
  }