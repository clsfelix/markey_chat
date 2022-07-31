<template>
  <div class="container">
    <div 
      v-for="service in services"
      :key="service.id"
      class="services" @click="selectService(service)">
      <div> 
        <span class="text">{{service.titulo}}</span>
        <span class="text">{{Number(service.valor).toLocaleString('pt-BR', { style:'currency', currency:'BRL' })}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  props:{
    services:[]
  },
  data(){
    return{
      store:useStore(),
      isSelected:false
    }
  },
  methods:{
    selectService(service){
      if(this.isSelected){
        return;
      }
      this.store.dispatch('chat/setSelectedService', {service})
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
    max-height: 120px;
    padding:0 0 12px 0;
}

.services {
background: #FAC80B;
border-radius: 18px;
display: flex;
margin-right: 12px;
}

.services > div {
  height: 65px; 
  width: 110px;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  padding: 4px;
  flex-direction: column;
}

.text{
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
}

</style>