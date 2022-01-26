import Vue from "vue";
import Welcome from "./components/Welcome.vue";

new Vue({
  el: "#app",
  data: {
    msg: "addtional page"
  },
  template: "<Welcome />",
  components: {
    Welcome
  }
});
