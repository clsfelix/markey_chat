<template>

<div class="container">
    <div class="inputContainer">
        <span class="code">+55</span>
        <input 
        v-model="value" 
        @keydown="handleEnter" 
        type="tel"
        v-maska="'## # ####-####'"
        placeholder="## # ####-####"
        @maska="rawValue = $event.target.dataset.maskRawValue"
        >
        <button  class="sendButton" @click="submit()">Enviar</button>
    </div>
</div>
<div class="buttonContainer">
    <button @click="dontSend()">Não informar</button>
</div>
  
</template>

<script>
import { useStore } from 'vuex'
export default {
    data(){
        return{
            value: "",
            store:useStore(),
            rawValue:""
        }
    },
    methods:{
        submit(){

            this.store.dispatch('chat/submitInput', {
                key: 'clientPhone',
                value: this.value,
                rawValue:`55${this.rawValue}`,
                dispatch:'createAppointment'
            })
        },

        dontSend() {

                this.store.dispatch('chat/submitInput', {
                key: 'clientPhone',
                value: "Não informar",
                rawValue:"",
                dispatch:'createAppointment'
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

    .code {
        display: flex;
        align-items: flex-end;
        border-bottom: 1px solid #FAC80B;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        padding-bottom: 4px;

    }
    .container {
    padding: 0;
    margin: 8px 0px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;   
    padding:0 0 12px 0;
    }

    .buttonContainer {
        float: right;
    }

    .buttonContainer > button {
        width: 125px;
        height: 28px;
        background: #FFE01B;
        border-radius: 10px;
        outline: none;
        border: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
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
        width: 120px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        text-align: right;
        margin-right: 8px;
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