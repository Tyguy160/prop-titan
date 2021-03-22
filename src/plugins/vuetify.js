import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const options = {
  theme: {
    themes: {
      light: {
        primary: "#009688",
        secondary: "#455A64",
        accent: "#00bcd4",
        error: "#ff5722",
        warning: "#ff9800",
        info: "#2196f3",
        success: "#4caf50",
      },
    },
  },
};

export default new Vuetify(options);
