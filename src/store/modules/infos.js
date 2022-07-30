import { getEstablishmentService } from '../../api/api'

const state = () => {
    return {
        loadEstablishment:false,
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
        console.log({options: state.optionsSelected})
    }
}

const actions = {
    getEstablishment : async ({ commit, state, dispatch },hash)=>{
        try{
            const response = await getEstablishmentService(hash);
            commit('updateEstablishmentState', response);
            dispatch('initChat', {}, {root:true});


        }
        catch(e) {
            console.error(e);
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