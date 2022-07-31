<script>
import SelectEstablishment from "./SelectEstablishments.vue";
import SelectProfessional from "./SelectProfessional.vue";
import SelectService from './SelectServices.vue';
import SelectDate from './SelectDate.vue';
import SelectHour from './SelectHour.vue';
import AnswerInput from './AnswerInput.vue';
import AnswerInputPhone from './AnswerInputPhone.vue';
import OhtersOptions from './OthersOptions.vue';
export default {
  props: {
    data:"",
    type: "",
  },
  data() {
    return {};
  },
  components: {
    "Select-Establishment": SelectEstablishment,
    "select-professional" : SelectProfessional,
    "select-service" : SelectService,
    "select-date" : SelectDate,
    "select-hour" : SelectHour,
    "answer-input" : AnswerInput,
    "answer-input-phone" : AnswerInputPhone,
    'others-options' : OhtersOptions
  },
};
</script>

<template>
  <div class="message" v-if="type === '' || type === 'question'">
    <label class="text">{{ data }}</label>
  </div>

  <div class="awnser" v-else-if="type === 'answer'">
    <label class="text">{{ data }}</label>
  </div>

  <div class="message-without-layer" v-else-if="type === 'selectEstablishment'">
    <Select-Establishment />
  </div>

  <div class="message-without-layer" v-else-if="type === 'selectProfessional'">
    <select-professional :profesionals="data" />
  </div>

  <div class="message-without-layer" v-else-if="type === 'selectServices'">
    <select-service :services="data" />
  </div>

  <div class="message-without-layer" v-else-if="type === 'selectDate'">
    <select-date :professional="data"  />
  </div>

  <div class="message-without-layer" v-else-if="type === 'selectHour'">
    <select-hour :hours="data"  />
  </div>


 <div class="awnser-input" v-else-if="type === 'awnserInput' ">
    <answer-input :parameters="data" />
  </div>

   <div class="awnser-input" v-else-if="type === 'answerInputPhone' ">
    <answer-input-phone />
  </div>

  <div class="awnser-input" v-else-if="type === 'selectOtherOption' ">
    <others-options :options="data" />
  </div>

  <div class="message" v-else-if="type === 'sucessSchedule'">
    <p class="text">
      ✅ Agendamento realizado com sucesso!
    </p>
    <p class="text">
      Dados do Agendamento:
    </p>
    <p class="text">
      Data: {{data.dataReserva}} 
    </p>
    <p class="text">
      Horário: {{data.horarioAgendamento}}
    </p>
    <p class="text">
      Em nome de: {{data.nomeCliente}}
    </p>
    <p class="text">
      Profissional: {{data.professionalNome}}
    </p>
    <p class="text">
      Serviço: {{data.serviceTitulo}}
    </p>
    <p class="text">
      Valor: {{data.valor}}
    </p>
    <p class="text">
      Endereço: {{data.enderecoCompleto}}
    </p>
  </div>



  
</template>

<style scoped>
.message {
  margin: 0;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 12px 14px;
  width: fit-content;
  max-width: calc(100vw - 32px);
  animation: slinde-in-left 0.5s;
}

.message + .message {
  margin-top: 8px;
}

.message + .awnser {
  margin-top: 8px;
}

.awnser + .message {
  margin-top: 8px;
}

.message-without-layer {
  border-radius: 10px;
  padding: 12px 0px;
  width: fit-content;
  max-width: calc(100vw - 32px);
  animation: slinde-in-left 0.5s;
}

.awnser {
  margin: 0 0 0 auto;
  background: #DAD7D7;
  border-radius: 10px;
  padding: 12px 14px;
  width: fit-content;
  max-width: calc(100vw - 32px);
  animation: slinde-in-right 0.5s;
}

.awnser-input {
  margin: 0 0 0 auto;
  border-radius: 10px;
  padding: 12px 14px;
  width: fit-content;
  max-width: calc(100vw - 32px);
  animation: slinde-in-right 0.5s;
}


.text {
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000;
}

@keyframes slinde-in-left {
  from {
    transform: translateX(-110%);
  }

  to {
    transform: translateX(0%);
  }
}

@keyframes slinde-in-right {
  from {
    transform: translateX(110%);
  }

  to {
    transform: translateX(0%);
  }
}
</style>