<template id="quiz-template">
  <div id="quiz" :class="containerClass">
    <div>
      <quiz-title-component
        :question-index="currentQuestionIndex"
        :questions-count="questionsCount"
      ></quiz-title-component>

      <quiz-question-component
        :current-question="currentQuestion"
        v-on:answer-marked="onAnswerMarked"
        ref="questionDisplay"
      >
      </quiz-question-component>

      <quiz-control-component
        :state="quizState"
        :quiz-score="score"
        :questions-count="questionsCount"
        v-on:finish-quiz-requested="finishQuiz"
        v-on:next-question-requested="showNextQuestion"
      >
      </quiz-control-component>
    </div>
  </div>
</template>

<script>
import QuizCreator from "./../QuizCreator";
import QuizTitleComponent from "./QuizTitle.vue";
import QuizQuestionComponent from "./QuizQuestion.vue";
import QuizControlComponent from "./QuizControl.vue";
import {
  Categories,
  AppState,
  QuizState,
  AnswerState
} from "./../utility/enums";
import { isConnectionError } from "./../utility/utility";

export default {
  data() {
    return {
      answersCount: 4,
      questionsCount: 10,

      choosenCategory: Categories.None,

      questions: [],
      quizState: QuizState.None,
      currentQuestionIndex: -1,
      score: 0
    };
  },
  computed: {
    containerClass() {
      return {
        "non-visible": this.appState !== AppState.Quiz
      };
    },
    currentQuestion() {
      if (this.questions[this.currentQuestionIndex] !== undefined) {
        return this.questions[this.currentQuestionIndex];
      } else {
        return null;
      }
    }
  },
  methods: {
    async initializeQuiz(choosenCategory) {
      try {
        const questions = await QuizCreator.create(
          choosenCategory,
          this.questionsCount,
          this.answersCount
        );
        this.questions = JSON.parse(JSON.stringify(questions)); // it doesn't work the simple '=' way
      } catch (err) {
        if (isConnectionError(err)) {
          alert(
            "It seems that one of our pet providers is out! :( Is your Internet connection okay by the way?"
          );
          this.finishQuiz();
        } else {
          throw err;
        }
      }

      this.score = 0;
      this.currentQuestionIndex = 0;
      this.quizState = QuizState.ShowingQuestion;
    },

    onAnswerMarked(answer) {
      // check if user has already marked the answer
      if (this.quizState !== QuizState.ShowingQuestion) {
        return;
      }

      const choosenAnswerIndex = this.currentQuestion.answers.findIndex(
        el => el.displayName === answer.displayName
      );

      if (choosenAnswerIndex === this.currentQuestion.answerIndex) {
        this.currentQuestion.answers[choosenAnswerIndex].state =
          AnswerState.Good;
        this.score++;
      } else {
        this.currentQuestion.answers[choosenAnswerIndex].state =
          AnswerState.Bad;
        this.currentQuestion.answers[this.currentQuestion.answerIndex].state =
          AnswerState.Good;
      }

      if (this.currentQuestionIndex === this.questionsCount - 1) {
        this.quizState = QuizState.Finished;
      } else {
        this.quizState = QuizState.ShowingAnswer;
      }
    },

    showNextQuestion() {
      this.currentQuestionIndex++;
      this.quizState = QuizState.ShowingQuestion;
    },

    finishQuiz() {
      this.reset();
      this.$emit("quiz-finished");
    },

    reset() {
      this.quizState = QuizState.None;
      this.choosenAnswerIndex = -1;
      this.score = 0;
      this.questions = [];
      this.$refs.questionDisplay.clearImage();
    }
  },
  components: {
    QuizTitleComponent,
    QuizQuestionComponent,
    QuizControlComponent
  },
  props: {
    appState: {
      required: true,
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
#quiz {
  display: flex;
  justify-content: center;
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  min-width: 400px;

  transition: opacity 1s;
}

#quiz.non-visible {
  visibility: hidden;
  opacity: 0;
  transition: opacity 1s;
}
</style>
