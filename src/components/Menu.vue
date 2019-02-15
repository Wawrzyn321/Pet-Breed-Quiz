<template>
  <div class="flex-center">
    <div class="quiz-choice-wrapper">
      <div class="half half-left" :class="leftClasses" @click="requestCatQuiz">
        <div class="masking-circle"></div>
      </div>
      <div
        class="half half-right"
        :class="rightClasses"
        @click="requestDogQuiz"
      >
        <div class="masking-circle"></div>
      </div>
      <div
        class="center-button"
        :class="centerClasses"
        @click="requestBothQuiz"
      >
        <p>Why<br />not<br />both?</p>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState, Categories } from "./../utility/enums";

export default {
  computed: {
    leftClasses() {
      return {
        "transition-left":
          this.state === AppState.Quiz &&
          this.choosenCategory !== Categories.Both,
        "transition-bottom":
          this.state === AppState.Quiz &&
          this.choosenCategory === Categories.Both
      };
    },
    rightClasses() {
      return {
        "transition-right":
          this.state === AppState.Quiz &&
          this.choosenCategory !== Categories.Both,
        "transition-bottom":
          this.state === AppState.Quiz &&
          this.choosenCategory === Categories.Both
      };
    },
    centerClasses() {
      return {
        "transition-left":
          this.state === AppState.Quiz &&
          this.choosenCategory === Categories.Cats,
        "transition-right":
          this.state === AppState.Quiz &&
          this.choosenCategory === Categories.Dogs,
        "transition-bottom":
          this.state === AppState.Quiz &&
          this.choosenCategory === Categories.Both
      };
    }
  },
  methods: {
    requestCatQuiz() {
      this.$emit("quiz-requested", Categories.Cats);
    },
    requestDogQuiz() {
      this.$emit("quiz-requested", Categories.Dogs);
    },
    requestBothQuiz() {
      this.$emit("quiz-requested", Categories.Both);
    }
  },
  props: ["state", "choosenCategory"]
};
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  height: 100%;
  animation: scale-anim 0.8s cubic-bezier(0.34, 1, 0.62, 0.98);
}

.quiz-choice-wrapper {
  width: 2 * $R;
  height: 2 * $R;
  position: relative;
  animation: rotate-anim 0.8s cubic-bezier(0.26, 0.51, 0.78, 0.74);
}

.center-button {
  @include circle($r);
  cursor: pointer;
  background-color: $secondary-color;
  color: $text-light;
  transition: all 0.4s;

  position: absolute;
  left: $R;
  top: $R;
  transform: translate(-50%, -50%);

  &:hover {
    background-color: $secondary-color-hover;
  }

  & > p {
    top: 0%;
    left: 28%;
    position: absolute;
    text-align: center;
    font-size: 2.4em;
  }
}

.half {
  cursor: pointer;
  position: absolute;
  background-color: $primary-color;
  width: $R;
  height: $R * 2;
  left: $R;
  top: 0;
  transition: all 0.3s;
  color: $text-light;
  box-shadow: 2px 2px $primary-color-hover;

  &:before {
    position: absolute;
    top: 50%;
    font-size: 3em;
    transform: translate(-50%, -50%);
  }
}

.half-left {
  border-radius: $R * 2 0 0 $R * 2;
  transform: translate(-$R, calc(-50% + #{$R}));

  & > * {
    transform: translate($R - $halfr, $R - $halfr);
  }

  &:hover {
    transform: translate(-$R - $delta, calc(-50% + #{$R}));
  }

  &:before {
    content: "CATS";
    left: 33%;
  }
}

.half-right {
  border-radius: 0 $R * 2 $R * 2 0;
  transform: translate(0, calc(-50% + #{$R}));

  & > * {
    transform: translate(-$halfr, $R - $r * 0.5);
  }

  &:hover {
    transform: translate($delta, calc(-50% + #{$R}));
  }

  &:before {
    content: "DOGS";
    left: 67%;
  }
}

.masking-circle {
  @include circle($r);
  position: absolute;
  background-color: $bg-color;
}

.transition-left {
  left: -$R * 2 !important;
  opacity: 0;
  transition: all 1s;
}

.transition-right {
  left: $R * 3 !important;
  opacity: 0;
  transition: all 1s;
}

.transition-bottom {
  top: $R * 1.3 !important;
  opacity: 0;
  transition: all 1s !important;
}
</style>
