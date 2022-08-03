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
    getEstablishment : async ({ commit, state, dispatch },hash)=>{
        try{
            const response = await getEstablishmentService(hash);
            commit('updateEstablishmentState', response);
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
            console.log(3)
            commit('clearOptions');
            dispatch('initChat', {}, {root:true});
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