import QuizControl from "@/components/QuizControl";
import { shallowMount } from "@vue/test-utils";
import { QuizState } from "@/utility/enums";

describe("QuizControl", () => {
  describe("Rendering", () => {
    for (const state in QuizState) {
      it(`renders in ${state} state`, () => {
        const wrapper = shallowMount(QuizControl, {
          propsData: { state }
        });

        expect(wrapper.element).toMatchSnapshot();
      });
    }
  });

  describe("Events", () => {
    it("emits next questions request on clicking on next question button", () => {
      const wrapper = shallowMount(QuizControl, {
        propsData: { state: QuizState.ShowingAnswer }
      });

      wrapper.find("#request-next-question-button").trigger("click");

      expect(wrapper.emitted()).toEqual({ "next-question-requested": [[]] });
    });

    it("emits finish quiz request on clicking on finish quiz button", () => {
      const wrapper = shallowMount(QuizControl, {
        propsData: { state: QuizState.None }
      });

      wrapper.find("#finish-quiz-button").trigger("click");

      expect(wrapper.emitted()).toEqual({ "finish-quiz-requested": [[]] });
    });
  });

  describe("UI", () => {
    it("displays next question button on ShowingAnswer state", () => {
      const wrapper = shallowMount(QuizControl, {
        propsData: { state: QuizState.ShowingAnswer }
      });

      // eslint-disable-next-line prettier/prettier
      expect(wrapper.find("#request-next-question-button").isVisible()).toBe(true);
    });

    it("does not display next question button on state different from ShowingAnswer", () => {
      const wrapper = shallowMount(QuizControl, {
        propsData: { state: QuizState.ShowingQuestion }
      });

      expect(wrapper.find("#request-next-question-button").exists()).toBe(
        false
      );
    });

    it("displays quiz score when quiz is finished", () => {
      const wrapper = shallowMount(QuizControl, {
        propsData: { state: QuizState.Finished }
      });

      expect(wrapper.find("#quiz-score-display").isVisible()).toBe(true);
    });

    it("does not display quiz score when quiz is not finished", () => {
      const wrapper = shallowMount(QuizControl, {
        propsData: { state: QuizState.ShowingAnswer }
      });

      expect(wrapper.find("#quiz-score-display").exists()).toBe(false);
    });

    it("displays valid quiz score when quiz is finished", () => {
      const wrapper = shallowMount(QuizControl, {
        propsData: {
          state: QuizState.Finished,
          quizScore: 2,
          questionsCount: 10
        }
      });

      // eslint-disable-next-line prettier/prettier
      expect(wrapper.find("#quiz-score-display > p").text()).toBe("Your score: 2 / 10.");
    });
  });
});
