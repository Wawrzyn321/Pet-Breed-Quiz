import Vue from "vue";
import { AppState, Categories } from "./utility/enums";
import MenuComponent from "./components/Menu.vue";
import QuizComponent from "./components/Quiz.vue";

Vue.config.productionTip = false;

import "./styles/common.scss";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  name: "app",
  data: function() {
    return {
      state: AppState.Menu,
      choosenCategory: Categories.None,
      title: "Pet Quiz"
    };
  },
  methods: {
    startQuiz(quizType) {
      this.state = AppState.Quiz;
      this.choosenCategory = quizType;
      this.$refs.quizComponent.initializeQuiz(quizType);
    },
    finishQuiz() {
      this.state = AppState.Menu;
      this.choosenCategory = Categories.None;
    }
  },
  components: { MenuComponent, QuizComponent }
});
