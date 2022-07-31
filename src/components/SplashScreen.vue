<template>
  <div class="container" :class="{'animated':loadedEstablishment}">
    <img src="../assets/logo-redonda.svg" />
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    data(){
        return{
            store: useStore()
        }
    },
    computed:{
        loadedEstablishment(){
            return this.store.getters['infos/getLoadedEstablishment'];
        }
    }
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 10;
  display: flex;
  background: linear-gradient(180deg, #ffe01b 0%, #fff 100%);
  justify-content: center;
  align-items: center;

}
.container img {
  margin-bottom: 100px;
}

.animated {
    animation: slice-up 1s;
    animation-fill-mode: forwards;
}

.animated img {    
  animation: reduce-img 1s;
  animation-fill-mode: forwards;
}

@keyframes slice-up {
    0% {
        height: 100vh;
        opacity: 1;
    }

    50% {

        height: 100vh;
        opacity: 1;
    }

    90% {
        height: 205px;
    }
    100% {
        display: none !important;
        opacity: 0;
        z-index: -1;
    }
}

@keyframes reduce-img {
    from {
        opacity: 100%;
    }

    to {
        opacity: 0;
    }
}
</style>