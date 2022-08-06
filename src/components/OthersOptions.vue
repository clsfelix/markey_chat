<template>
  <div class="container">
    <button
    class="mkbutton"
    v-for="option in options" 
    :key="option"
    @click="selectOption(option)">
        {{labels[option]}}
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  props:{
    options:[]
  },
  data(){
    return{
      store:useStore(),
      isSelected:false,
      labels: {
        'professional' : 'Outro profissional',
        'service' : 'Outro serviço',
        'date' : 'Outra data',
        'hour' : 'Outro horário'
      }
    }
  },
  methods:{
    selectOption(option){
      if(this.isSelected){
        return;
      }
      this.store.dispatch('chat/setOtherOption', option)
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
    display: flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    overflow-x: auto;
    max-height: 120px;
    padding:0 0 12px 0;
}
.mkbutton {
  width: 25vw;
  max-width: 120px;
  height: 40px;
  background: #FFE01B;
  border-radius: 10px;
  outline: none;
  border: none;
  margin-right: 4px;
  font-family: 'Inter' sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
}

</style>