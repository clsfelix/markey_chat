<template>
  <div class="container">
    <div
      v-for="date in dates"
      :key="date.id"
      class="date"
      @click="selectDate(date)"
      :class="{ disabled: date.disabled }"
    >
      <div>
        <span class="text">{{ date.monthName }}</span>
        <span class="text day">{{ date.date }}</span>
        <span class="text">{{ date.dayName }}</span>
      </div>
    </div>
  </div>
  <div class="container" v-if="!isSelected">
    <div class="inputContainer">
      <input
        v-model="value"
        @keydown="handleEnter"
        type="tel"
        v-maska="'##/##/####'"
        placeholder="00/00/0000"
        :class="{'error':error}"
      />
      <button class="sendButton" :class="{'error':error}" @click="submit()">Enviar</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { week, months } from "../config/weekAndMonths";

export default {
  props: {
    professional: {},
  },
  data() {
    return {
      store: useStore(),
      isSelected: false,
      dates: [],
      value: "",
      error:false
    };
  },
  created() {
    let date = new Date();
    for (let index = 0; index < 15; index++) {
      date.setDate(date.getDate() + (index > 0 ? 1 : 0));
      let day = week.find((day) => day.day === date.getDay());
      let month = months.find((month) => month.month === date.getMonth());
      let numberDay = date.getDate();
      this.dates.push({
        id: index,
        day: day?.day,
        dayName: day?.name,
        month: month?.month,
        monthName: month?.name,
        date: numberDay,
        completeDate: new Date(date),
        disabled: !this.professional.funcionamento[day.name.toLowerCase()],
      });
    }
  },

  methods: {
    selectDate(date) {
      if (this.isSelected || date.disabled) {
        return;
      }
      this.dates.map((dat) => {
        if (dat.id !== date.id) {
          dat.disabled = true;
        }
      });
      this.store.dispatch("chat/setSelectedDate", {date});
      this.isSelected = true;
    },

    submit() {
      if (this.value.length < 10) {
        this.error = true;
        setTimeout(()=>this.error = false, 550)
        this.value = '';
        return;
      }

      const today = new Date().setHours(0, 0, 0, 0);

      const [_day, _month, _year] = this.value.split("/");

      const date = new Date(+_year, +_month - 1, +_day);

      date.setDate(date.getDate());

      let day = week.find((day) => day.day === date.getDay());
      let month = months.find((month) => month.month === date.getMonth());
      let numberDay = date.getDate();

      let selectedDate = {
        id: 100,
        day: day?.day,
        dayName: day?.name,
        month: month?.month,
        monthName: month?.name,
        date: numberDay,
        completeDate: new Date(date),
        disabled: !this.professional.funcionamento[day.name.toLowerCase()],
      };
      if (selectedDate.disabled || today > date) {
        this.isSelected = true;
        let i = 0;
        const queue = setInterval(() => {
          switch (i) {
            case 0: {
              this.store.commit("chat/pushAnswer", this.value);
              break;
            }
            case 1: {
              this.store.commit("chat/pushQuestion", {
                question: "dateIsInvalid",
              });
              break;
            }
            case 2: {
              this.store.dispatch("chat/setOtherOption", "date");
              break;
            }
            default: {
              clearInterval(queue);
            }
          }
          i++;
        }, 200);
      } else {
        this.selectDate(selectedDate);
      }
    },
    handleEnter(e) {
      if (e.key === "Enter") {
        this.submit();
      }
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

.date {
  background: #fac80b;
  border-radius: 8px;
  display: flex;
  margin-right: 12px;
}

.disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  color: #9d9d9d;
}
.disabled .text {
  color: #9d9d9d;
}

.date > div {
  height: 65px;
  width: 38px;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  padding: 4px;
  flex-direction: column;
}

.text {
  font-family: "Amiko", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 13px;
  text-align: center;
  color: #131313;
}
.day {
  font-size: 12px;
}

.inputContainer {
  width: calc(100vw - 32px);
  display: flex;
  justify-content: end;
  -webkit-justify-content: flex-end;
}
.inputContainer > input {
  outline: none;
  border: none;
  border-bottom: 1px solid #fac80b;
  width: 100px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  overflow-x: hidden;
}

.sendButton {
  background: transparent;
  border: solid 1px #fac80b;
  padding: 8px 12px;
  border-radius: 10px;
  margin-left: 4px;
  color: #fac80b;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
}

.error {
  animation: vibrate 0.5s;
}

@keyframes vibrate {
  0% {
    transform: translateX(-2px);
    border-color: red;
  }

  10% {
    transform: translateX(0px);
  }

  20% {
    transform: translateX(-2px);    
  }

  30% {
    transform: translateX(0px);
  }

  40% {
    transform: translateX(-2px);
  }

  50% {
    transform: translateX(0px);    
  }
  60% {
    transform: translateX(-2px);
  }

  70% {
    transform: translateX(0px);
  }

  80% {
    transform: translateX(-2px);    
  }

  90% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(0px);
  }
}

</style>