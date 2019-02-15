import QuizAnswer from "@/components/QuizAnswer";
import { shallowMount } from "@vue/test-utils";
import { AnswerState } from "@/utility/enums";

describe("QuizAnswer", () => {
  describe("Applying classes", () => {
    it("should not apply any classes when answer state is none", () => {
      const answer = {
        state: AnswerState.None,
        displayName: "Malamute",
        linkName: "malamute"
      };
      const wrapper = shallowMount(QuizAnswer, {
        propsData: { answer }
      });
      expect(wrapper.classes()).not.toContain("valid");
      expect(wrapper.classes()).not.toContain("invalid");
    });

    it("should apply valid classes if answer is marked good", () => {
      const answer = {
        state: AnswerState.Good,
        displayName: "Malamute",
        linkName: "malamute"
      };
      const wrapper = shallowMount(QuizAnswer, {
        propsData: { answer }
      });
      expect(wrapper.classes()).toContain("valid");
      expect(wrapper.classes()).not.toContain("invalid");
    });

    it("should apply valid classes if answer is marked bad", () => {
      const answer = {
        state: AnswerState.Bad,
        displayName: "Malamute",
        linkName: "malamute"
      };
      const wrapper = shallowMount(QuizAnswer, {
        propsData: { answer }
      });
      expect(wrapper.classes()).toContain("invalid");
      expect(wrapper.classes()).not.toContain("valid");
    });
  });

  it("should display answer's displayName", () => {
    const answer = {
      state: AnswerState.None,
      displayName: "Malamute",
      linkName: "malamute"
    };
    const wrapper = shallowMount(QuizAnswer, {
      propsData: { answer }
    });
    expect(wrapper.text()).toBe(answer.displayName);
  });

  it("should emit answer-marked event on clicking answer", () => {
    const wrapper = shallowMount(QuizAnswer, {
      propsData: { answer: { displayName: "answer" } }
    });

    wrapper.find("li").trigger("click");

    expect(wrapper.emitted()).toEqual({
      "answer-marked": [[{ displayName: "answer" }]]
    });
  });
});
