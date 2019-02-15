<template>
  <div>
    <div id="image-wrapper">
      <img
        :src="imageUrl"
        @load="imageLoaded"
        alt="loading quiz image..."
        @click="requestAnotherImage(currentQuestion)"
      />

      <div
        class="overlay"
        :class="overlayClass"
        :style="overlayStyle"
      ></div>

      <div class="hint" :class="{ 'can-show-hint': !isLoading }">
        Can't make out this breed?
        <br />
        Click this image!
      </div>

      <div class="easter-egg" v-if="photoSwitchCount === 10">
        You have already seen 10 pictures in this question.
        <br />
        If you just want to browse cute animals, that's okay, too!
      </div>
    </div>
    <ul v-if="!isLoadingForNewQuestion">
      <li
        v-for="(answer, index) in answers"
        is="quiz-answer-component"
        :answer="answer"
        :key="index"
        v-on:answer-marked="onAnswerMarked"
      ></li>
    </ul>
  </div>
</template>

<script>
import QuizAnswerComponent from "./QuizAnswer.vue";
import ImageFetcher from "./../services/ImageFetcher";
import { isConnectionError } from "./../utility/utility";

export default {
  data() {
    return {
      imageUrl: null,
      isLoading: false,
      isLoadingForNewQuestion: false,
      previousLinkName: null,
      imageWidth: 0,
      photoSwitchCount: 0
    };
  },
  computed: {
    answers() {
      if (this.currentQuestion) {
        return this.currentQuestion.answers;
      } else {
        return [];
      }
    },
    overlayStyle() {
      // add 8px for borders
      const borderAdjust = this.imageWidth ? 8 : 0;
      return {
        width: this.imageWidth + borderAdjust + "px"
      };
    },
    overlayClass() {
      return { 'overlay-overlaid': this.isLoading };
    }
  },
  methods: {
    onAnswerMarked(answer) {
      this.$emit("answer-marked", answer);

      // reset photoSwitchCount, but only if it wasn't already >=10
      if (this.photoSwitchCount < 10) {
        this.photoSwitchCount = 0;
      }
    },

    async updateImage(currentQuestion) {
      if (currentQuestion) {
        const breedLinkName = currentQuestion.answers[currentQuestion.answerIndex].linkName;

        //load image of new breed, even if image of the previous breed was still loading
        const forceReload = this.previousLinkName !== breedLinkName;

        if (!this.isLoading || forceReload) {
          this.isLoading = true;
          this.previousLinkName = breedLinkName;

          try {
            this.imageUrl = await ImageFetcher.fetchPicture(
              breedLinkName,
              currentQuestion.type
            );
          } catch (err) {
            if (isConnectionError(err)) {
              alert(
                "It seems that one of our " +
                  currentQuestion.type +
                  " photo providers is out! :( Is your Internet connection okay by the way?"
              );
              this.$emit("quiz-aborted");
            } else {
              throw err;
            }
          }
        }
      }
    },

    imageLoaded(e) {
      this.isLoading = false;
      this.isLoadingForNewQuestion = false;
      this.imageWidth = e.target.clientWidth;
    },

    requestAnotherImage(currentQuestion) {
      this.photoSwitchCount++;
      this.updateImage(currentQuestion);
    },

    clearImage() {
      this.imageUrl = "#";
      this.imageWidth = 0;
    }
  },
  watch: {
    currentQuestion(currentQuestion) {
      this.isLoadingForNewQuestion = true;
      this.updateImage(currentQuestion, true);
    }
  },
  props: ["currentQuestion"],
  components: { QuizAnswerComponent }
};
</script>

<style lang="scss" scoped>
#image-wrapper {
  cursor: pointer;
  position: relative;
}

#image-wrapper:hover .hint.can-show-hint {
  opacity: 1;
  transition: opacity 0.4s 1.5s;
}

img {
  display: block;
  position: relative;
  margin: 0 auto;
  max-width: 500px;
  max-height: 400px;
  border: 3px solid $primary-color;
  box-shadow: 10px 10px 24px 0px $secondary-color-hover;
  @include quiz-image-border;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  opacity: 0;
  background-color: $bg-color-hover;
  margin: 0 auto;
  pointer-events: none;
  @include quiz-image-border;
}

.overlay-overlaid {
  opacity: 0.7;
  transition: 0.7s;
}

.hint {
  position: absolute;
  width: 160px;
  left: calc(100% + 30px);
  top: 20%;
  transform: translateY(-50%);
  opacity: 0;
  cursor: default;
  color: $primary-color;

  &::before {
    content: "";
    position: absolute;
    left: -30px;
    color: transparent;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 20px solid $primary-color;
    transform: translateY(1.35em);
  }
}

.easter-egg {
  position: absolute;
  width: 200px;
  left: calc(100% + 30px);
  top: 70%;
  transform: translateY(-50%);
  cursor: default;
  color: $primary-color;
  transition: opacity 0.3s 0.3s;
}

button {
  text-transform: capitalize;
}

ul {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 5px;
  padding-left: 0px;
}
</style>
