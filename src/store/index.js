import { createStore } from 'vuex';
import chat from './modules/chat';
import infos from './modules/infos';

export default createStore({
    modules:{
        chat,
        infos
    }
})