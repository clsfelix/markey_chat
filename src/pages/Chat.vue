<script>
  import {useStore} from 'vuex' 
  import MkHeader from '../components/MkHeader.vue';
  import Message from '../components/Message.vue';
  import SelectEstablishment from '../components/SelectEstablishments.vue';
  import {questions} from '../config/messages'
  import SplashScreen from '../components/SplashScreen.vue';
  export default {

    data() {
       return{
        questions,
        renderingQuestions:[],
        store: useStore(),
        chatMessages:[]
       } 
    },
    methods: {
    },
    created(){
        this.store.commit('chat/clear');
        this.chatMessages = this.store.getters['chat/getChat'];
        this.store.dispatch('infos/getEstablishment');
    },
    components:{
        MkHeader,
        Message,
        SelectEstablishment,
        'splash-screen':SplashScreen
    }
  }
</script>

<template>
  <main class="body">
    <splash-screen />
    <MkHeader />
    <div class="chatBody">
      <div class="growing" ref="grow">
          <Message 
            v-for="(question, index) in chatMessages" 
            :key=index 
            :data="question.data"
            :type="question.type" />
      </div>
    </div>
  </main>
</template>

<style scoped>

  .body {
    width: 100vw;
    height: 100vh;
    margin: 0;
  }

  .growing {
    transition: all 0.5s;
  }

  .chatBody {
    width: 100vw;
    padding: 1.5rem 1rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column-reverse;
    -webkit-flex-direction: column-reverse;
    max-height: calc(100vh - 210px);
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1 0 auto;
    scroll-behavior:auto;

  }
  
</style>
