import { getEstablishmentService } from '../../api/api'

const state = () => {
    return {
        loadedEstablishment:false,
        establishment:{
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
                dispatch('initChat', {}, {root:true});
            }
        }
        catch(e) {
            console.error(e);
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