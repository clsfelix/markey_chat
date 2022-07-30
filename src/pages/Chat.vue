<script>
  import {useStore} from 'vuex' 
  import MkHeader from '../components/MkHeader.vue';
  import Message from '../components/Message.vue';
  import SelectEstablishment from '../components/SelectEstablishments.vue';
  import { v4 as uuidV4 } from 'uuid'
  import {questions} from '../config/messages'
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
        this.store.dispatch('infos/getEstablishment', '6gmp2rvs20');

    },
    components:{
        MkHeader,
        Message,
        SelectEstablishment
    }
  }
</script>

<template>
  <main class="body">
    <MkHeader />
    <div class="chatBody">
      <div>
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

  .chatBody {
    width: 100vw;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column-reverse;
    max-height: calc(100vh - 210px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  
</style>
