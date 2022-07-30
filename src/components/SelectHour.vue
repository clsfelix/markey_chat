<template>
  <div class="container">
    <div class="hours">
      <select class="hourSelect" @change="selectHour" :disabled=isSelected>
        <option selected style="display:none" >Horário</option>
        <option v-for="hour in hours" :key="hour.slotReserva" :value="JSON.stringify(hour)">
          {{ hour.horarioAgendamento }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
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
    selectHour(e) {
      if (this.isSelected) {
        return;
      }
      const selectedHour = JSON.parse(e.target.value);
      this.store.dispatch("chat/setSelectedHour", selectedHour);
      this.isSelected = true;
    },
  },
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
  width: 141px;
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
  background: none;
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