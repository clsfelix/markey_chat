<script>
import { useStore } from 'vuex'
  export default {
    data(){
      return{
        store: useStore(),
        blockReinitChatOnLoadImage:false
      }
    },
    computed: {
        establishment(){
          return this.store.getters['infos/getEstablishmentData'];    
        },
        selectedEstablishment() {
          const data = this.store.getters['chat/getSelectedOptions'];
          return establishment.hasOwnProperty('establishment') ? data.establishment : null;
        },
        buttonRestart() {
          return this.store.getters['chat/getButton'];
        }
    },
    methods:{
      restartChat() {
        this.blockReinitChatOnLoadImage = true;
        this.store.dispatch('chat/restart');
      },
      loadedPicture() {
        if(!this.blockReinitChatOnLoadImage){
          console.log('here');
          this.store.dispatch('infos/finallyLoadedEstablishment');
        }
      }
    }
    
    
  }
</script>

<template>
  <div class="content">
    <div class="return" @click="restartChat()" v-show="buttonRestart">
      <img src="../assets/Vectorreturn.svg">
      <span>Reiniciar</span>
    </div>
    <img :src='establishment.userProfilePicture' alt="" srcset="" @load="loadedPicture()" />
    <label>{{establishment.nomeEstabelecimento}}</label>
  </div>
</template>

<style scoped>
.content {
  height: 205px;
  left: 0px;
  top: 0px;
  background: linear-gradient(180deg, #ffe01b 0%, rgba(255, 224, 27, 0) 100%);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 45px 0px;
}
.content > img {
  width: 73px;
  height: 73px;
  border-radius: 50%;

}

.content > label {
  font-family: 'Amiko', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  margin-top: 14px; 
  padding: 0px 1rem;  
}

.return {
  position: absolute;
  top: 16px;
  right: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.return img {
  width: 16px;
}

.return span {
  font-family: 'Inter' sans-serif;
  font-weight: 400;
  font-size: 16px;
}
</style>
