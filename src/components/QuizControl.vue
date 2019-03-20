<template>
  <div>
    <transition name="fade">
      <h3
        v-if="state === 'SHOWING_ANSWER'"
        class="link"
        @click="requestNextQuestion"
        id="request-next-question-button"
      >
        Next question >>
      </h3>
    </transition>

    <transition name="fade">
      <h3 v-if="state === 'FINISHED'" id="quiz-score-display">
        <p>Your score: {{ quizScore + " / " + questionsCount }}.</p>
      </h3>
    </transition>

    <p class="link" @click="finishQuiz" id="finish-quiz-button">
      Finish quiz
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    requestNextQuestion() {
      this.$emit("next-question-requested");
    },
    finishQuiz() {
      this.$emit("finish-quiz-requested");
    }
  },
  props: {
    state: {
      required: true,
      type: String
    },
    quizScore: {
      required: false,
      type: Number,
      default: 0
    },
    questionsCount: {
      required: false,
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
h3,
p {
  text-align: center;
}

.link {
  cursor: pointer;
  text-decoration: underline;
}
</style>
