<template>
  <div class="container">
    <div class="hours">
      <select class="hourSelect" @change="selectHour" :disabled=isSelected>
        <option selected style="display:none;" >Horário</option>
        <option v-for="hour in hours" :key="hour.slotReserva" :value="JSON.stringify(hour)">
          {{ hour.horarioAgendamento }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { getAvaliabledSchedules } from '../api/api';
export default {
  props: {
    hours: []
  },
  data() {
    return {
      store: useStore(),
      isSelected: false,
    };
  },
  methods: {
    async selectHour(e) {
      if (this.isSelected) {
        return;
      }
      const { service, professional, date } = this.store.getters['chat/getSelectedOptions']
      const selectedHour = JSON.parse(e.target.value);
      const availableHours = await getAvaliabledSchedules(professional.uidProfessional, service.id, date.completeDate.toLocaleDateString('pt-br'));
      if ((availableHours.findIndex((hour) => hour.slotReserva === selectedHour.slotReserva)) !== -1) { 
        this.store.dispatch("chat/setSelectedHour", selectedHour);
        this.isSelected = true;
      }
      else {
        this.store.dispatch('chat/setSelectedDate', {date, hiddenMessage:true, reSelectHour:true});
      }
    },
  },
  created(){
    console.log(window.navigator)
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
  padding: 0 0 12px 0;
}

.hourSelect {
  outline: none;
  width: 142px;
  height: 48px;
  border: 1px solid #fac80b;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 12px;
  color: #FAC80B;
  text-align: center;
  text-align: -webkit-center;
  text-align: -moz-center;
  background: none;
  padding: 0 25%;
}

.hourSelect > option{
  color: black;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}

select::-ms-expand {
  display: none;
}
</style>