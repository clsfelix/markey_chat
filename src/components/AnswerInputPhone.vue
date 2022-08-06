<template>
  <div class="container">
    <div class="inputContainer">
      <span class="code" :class="{ error: error }">+55</span>
      <input
        v-model="value"
        @keydown="handleEnter"
        type="tel"
        v-maska="'## # ####-####'"
        placeholder="## # ####-####"
        @maska="rawValue = $event.target.dataset.maskRawValue"
        :class='{"error":error}'
      />
      <button 
        class="sendButton" 
        @click="submit()"
        :class='{"error":error}'>
        Enviar
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  data() {
    return {
      value: "",
      store: useStore(),
      rawValue: "",
      error:false
    };
  },
  methods: {
    submit() {
      if (this.rawValue.length !== 11) {
        this.error = true;
        setTimeout(() => (this.error = false), 550);
        this.value = "";
        return;
      }

      this.store.dispatch("chat/submitInput", {
        key: "clientPhone",
        value: this.value,
        rawValue: `55${this.rawValue}`,
        dispatch: "createAppointment",
      });
    },

    dontSend() {
      this.store.dispatch("chat/submitInput", {
        key: "clientPhone",
        value: "Não informar",
        rawValue: "",
        dispatch: "createAppointment",
      });
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
.code {
  display: flex;
  align-items: flex-end;
  -webkit-align-items: flex-end;
  border-bottom: 1px solid #fac80b;
  font-family: "Inter";
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
  padding: 0 0 12px 0;
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
  width: 120px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: right;
  margin-right: 8px;
}

.sendButton {
  background: transparent;
  border: solid 1px #fac80b;
  padding: 8px 12px;
  border-radius: 10px;
  margin-left: 4px;
  color: #fac80b;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
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
    transform: translateX(0%);
  }
}
</style>