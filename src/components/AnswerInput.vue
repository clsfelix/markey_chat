<template>

<div class="container">
    <div class="inputContainer">
        <input v-model="value" @keydown="handleEnter" type="text">
        <button  class="sendButton" @click="submit()">Enviar</button>
    </div>
</div>
  
</template>

<script>
import { useStore } from 'vuex'
export default {
    data(){
        return{
            value: "",
            store:useStore()
        }
    },
    methods:{
        submit(){
            this.store.dispatch('chat/submitInput', {
                key: 'clientName',
                value: this.value
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
</style>