<template>
  <div class="container">
    <div 
      v-for = 'filial in establishment.filiais'
      :key = 'filial.id'
      class="establishment" @click="selectEstablishment(filial)">
        <img :src='filial.userProfilePicture' alt="" srcset="" />
        <span>{{filial.nome}}</span>
    </div>   
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  data(){
    return{
      store:useStore(),
      isSelected:false,
      establishment:{}
    }
  },
  methods:{
    selectEstablishment(filial){
      if(this.isSelected){
        return;
      }


      this.store.dispatch('chat/setSelectedEstablishment',filial)
      this.isSelected = true;
    }
  },
  beforeCreate() {
  },
  created() {
    this.establishment = (useStore()).getters['infos/getEstablishment'];
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
    max-height: fit-content;
}

.establishment {
    padding-bottom: 8px;
    margin-right: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
}

.establishment > span{
  font-family: "Inter", sans-serif;
  font-size: 12px;
  text-align: center;
}

.establishment > img {
  width: 73px;
  height: 73px;
  border-radius: 50%;
}
</style>