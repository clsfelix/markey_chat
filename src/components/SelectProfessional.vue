<template>
  <div class="container">
    <div 
      v-for="professional in profesionals.sort((a, b) => a.nome.localeCompare(b.nome))"
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
      this.store.dispatch('chat/setSelectedProfessional', {professional});
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
  width: 16vw;
  max-width: 80px;
  height: 16vw;
  max-height: 80px;
  border-radius: 50%;
}

</style>