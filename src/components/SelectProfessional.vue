<template>
  <div class="container">
    <div 
      v-for="professional in profesionals"
      :key="professional.uidProfessional"
      class="professional" @click="selectProfessional(professional)">
      <img :src="professional.userProfilePicture" alt="" srcset="" />
      <span>{{professional.nome}}</span>

    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  props:{
    profesionals:[]
  },
  data(){
    return{
      store:useStore(),
      isSelected:false
    }
  },
  methods:{
    selectProfessional(professional){
      if(this.isSelected){
        return;
      }
      this.store.dispatch('chat/setSelectedProfessional', professional)
      // this.store.commit('chat/pushQuestion','selectProfessionalMessage')
      this.isSelected = true;
    }
  }
};
</script>

<style scoped>
.container {
    padding: 0;
    margin: 8px 0px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    max-height: 100px;
}

.professional {
    padding-bottom: 8px;
    margin-right: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
}

.professional > span{
  font-family: "Inter", sans-serif;
  font-size: 12px;
  text-align: center;
}

.professional > img {
  width: 73px;
  height: 73px;
  border-radius: 50%;
}

</style>