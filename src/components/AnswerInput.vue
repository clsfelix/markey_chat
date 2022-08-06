<template>

<div class="container">
    <div class="inputContainer">
        <input 
        v-model="value" 
        @keydown="handleEnter" 
        type="text"
        v-maska="parameters.mask ?? ''"
        :class='{"error":error}'
        >
        <button  class="sendButton" @click="submit()" :class='{"error":error}' >Enviar</button>
    </div>
</div>
  
</template>

<script>
import { useStore } from 'vuex'
export default {
    props:{
        parameters:{
            mask:'',
            key:'',
            dispatch:''
        }
    },
    data(){
        return{
            value: "",
            store:useStore(),
            error:false
        }
    },
    methods:{
        submit(){

            if(this.value.length < 2) {
                this.error = true;
                setTimeout(()=>this.error = false, 550)
                this.value = '';
                return;
            }


            this.store.dispatch('chat/submitInput', {
                key: this.parameters.key,
                value: this.value, 
                dispatch:this.parameters.dispatch
            })
        },

        handleEnter(e) {
            if(e.key === 'Enter') {
                this.submit();
            }
        }
    }
}
</script>

<style scoped>
    .container {
    padding: 0;
    margin: 8px 0px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;   
    padding:0 0 12px 0;
    overflow-x: hidden;
    }

    .inputContainer {
        width: calc(100vw - 32px);
        display: flex;
        justify-content: end;
    }
    .inputContainer > input {
        outline: none;
        border: none;
        border-bottom: 1px solid #FAC80B;
        width: 100%;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
    }

    .sendButton {
        background: transparent;
        border: solid 1px #FAC80B;
        padding: 8px 12px;
        border-radius: 10px;
        margin-left: 4px;

        color: #FAC80B;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
    }

.error {
  animation: vibrate 0.5s;
}

@keyframes vibrate {
  0% {
    transform: translateX(-1px);
    border-color: red;
  }

  10% {
    transform: translateX(1px);
  }

  20% {
    transform: translateX(-1px);    
  }

  30% {
    transform: translateX(1px);
  }

  40% {
    transform: translateX(-1px);
  }

  50% {
    transform: translateX(1px);    
  }
  60% {
    transform: translateX(-1px);
  }

  70% {
    transform: translateX(1px);
  }

  80% {
    transform: translateX(-1px);    
  }

  90% {
    transform: translateX(1%);
  }

  100% {
    transform: translateX(0px);
  }
}
</style>