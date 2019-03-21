import Vue from "vue";
import { AppState, Categories } from "./utility/enums";
import MenuComponent from "./components/Menu.vue";
import QuizComponent from "./components/Quiz.vue";
import BreedListFetcher from "./services/BreedListFetcher";
import ImageFetcher from "./services/ImageFetcher";

Vue.mixin({
  beforeCreate() {
    if (this.$options.$diProviders) {
      this.$diProviders = this.$options.$diProviders;
    } else if (this.$options.parent && this.$options.parent.$diProviders) {
      this.$diProviders = this.$options.parent.$diProviders;
    }
  }
});

Vue.config.productionTip = false;

import "./styles/common.scss";

const $diProviders = {
  breedListFetcher: new BreedListFetcher(),
  imageProvider: new ImageFetcher()
};

/* eslint-disable no-new */
new Vue({
  el: "#app",
  name: "app",
  $diProviders,
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
