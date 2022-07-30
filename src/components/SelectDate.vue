<template>
  <div class="container">
    <div 
      v-for="date in dates"
      :key="date.id"
      class="date" 
      @click="selectDate(date)"
      :class="{ disabled: date.disabled}"
      >
      <div> 
        <span class="text" >{{date.monthName}}</span>
        <span class="text day">{{date.date}}</span>
        <span class="text">{{date.dayName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { week, months } from '../config/weekAndMonths';
export default {
  props:{
    professional:{}
  },
  data(){
    return{
      store:useStore(),
      isSelected:false,
      dates: []
    }
  },
  created() {
      let date = new Date();
      for (let index = 0; index < 15; index++) {
      date.setDate(date.getDate() + (index > 0 ? 1 : 0))
      let day = week.find((day) => day.day === date.getDay());
      let month = months.find((month) => month.month === date.getMonth());
      let numberDay = date.getDate();
      this.dates.push({
        id:index,
        day: day?.day,
        dayName: day?.name,
        month: month?.month,
        monthName: month?.name,
        date: numberDay,
        completeDate: new Date(date),
        disabled:!this.professional.funcionamento[day.name.toLowerCase()]
      });
    }
  },

  methods:{
    selectDate(date){
      if(this.isSelected || date.disabled){
        return;
      }
      this.dates.map(dat => {
        if(dat.id !== date.id) {
          dat.disabled = true;
        }
      })
      this.store.dispatch('chat/setSelectedDate', date)
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
    flex-direction: row;
    overflow-x: auto;
    max-height: 120px;
    padding:0 0 12px 0;
}

.date {
  background: #FAC80B;
  border-radius: 8px;
  display: flex;
  margin-right: 12px;
}

.disabled {
  background: #F5F5F5;
  cursor: not-allowed;
  color:#9D9D9D;

}
.disabled .text {
  color: #9D9D9D;
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

.text{
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

</style>