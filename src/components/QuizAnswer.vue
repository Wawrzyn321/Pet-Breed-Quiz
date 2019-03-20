<template>
  <li @click="markAnswer" :class="classObject">
    {{ answer.displayName }}
  </li>
</template>

<script>
import { AnswerState } from "./../utility/enums";

export default {
  computed: {
    classObject() {
      return {
        valid: this.answer.state === AnswerState.Good,
        invalid: this.answer.state === AnswerState.Bad
      };
    }
  },
  methods: {
    markAnswer() {
      this.$emit("answer-marked", this.answer);
    }
  },
  props: {
    answer: {
      required: true,
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
  font-size: 1.8em;
  list-style-type: none;
  border: 2px solid $text-dark;
  display: inline;
  padding: 3px;
  text-align: center;
  border-radius: 12px;
  text-transform: capitalize;
}

li:hover:not(.valid):not(.invalid) {
  background-color: $bg-color-hover;
  transition: 0.6s;
}

li.valid {
  background-color: $answer-valid;
  transition: 0.3s;
}

li.invalid {
  background-color: $answer-invalid;
  transition: 0.3s;
}
</style>
