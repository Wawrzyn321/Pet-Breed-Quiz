<template id="quiz-title-template">
  <h2>Question {{ text }}</h2>
</template>

<script>
export default {
  computed: {
    text() {
      return this.questionIndex + 1 + "/" + this.questionsCount;
    }
  },
  props: {
    // zero-based!
    questionIndex: {
      required: true,
      type: Number
    },
    questionsCount: {
      required: true,
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
</style>
