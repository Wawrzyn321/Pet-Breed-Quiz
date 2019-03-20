import QuizQuestion from "@/components/QuizQuestion";
import { shallowMount, mount } from "@vue/test-utils";

describe("QuizQuestion", () => {
  it("displays answer when is not loading next question", () => {
    const mockQuestion = {
      answers: [{ answer: 1 }, { answer: 2 }, { answer: 3 }]
    };
    const wrapper = shallowMount(QuizQuestion, {
      propsData: { currentQuestion: mockQuestion }
    });

    expect(wrapper.find("ul").isEmpty()).toBe(false);
    expect(wrapper.exists("ul > li")).toBe(true);
  });

  it("computed answers returns default value when question is not supplied", () => {
    const wrapper = shallowMount(QuizQuestion, {
      propsData: { currentQuestion: null }
    });

    expect(wrapper.vm.answers).toHaveLength(0);
  });

  it("computed answers returns answers value when question is supplied", () => {
    const mockQuestion = {
      answers: [{ answer: 1 }, { answer: 2 }, { answer: 3 }]
    };
    const wrapper = shallowMount(QuizQuestion, {
      propsData: { currentQuestion: mockQuestion }
    });

    expect(wrapper.vm.answers).toHaveLength(mockQuestion.answers.length);
  });

  it("applies border adjust to overlay border", () => {
    const borderWidth = 8;
    const wrapper = shallowMount(QuizQuestion, {
      propsData: { currentQuestion: null }
    });
    wrapper.setData({ imageWidth: 10 });

    const expectedWidth = borderWidth + 10 + "px";
    expect(wrapper.vm.overlayStyle.width).toBe(expectedWidth);
  });

  it("applies no border when image length is 0", () => {
    const wrapper = shallowMount(QuizQuestion, {
      propsData: { currentQuestion: null }
    });
    wrapper.setData({ imageWidth: 0 });

    const expectedWidth = "0px";
    expect(wrapper.vm.overlayStyle.width).toBe(expectedWidth);
  });

  it("renders answers when question is supplied", () => {
    const mockQuestion = {
      answers: [{ answer: 1 }, { answer: 2 }, { answer: 3 }]
    };
    const wrapper = mount(QuizQuestion, {
      propsData: { currentQuestion: mockQuestion }
    });

    expect(wrapper.find("ul > li").exists()).toBeTruthy();
  });

  it("does not render answers when there is no question", () => {
    const wrapper = mount(QuizQuestion, {
      propsData: { currentQuestion: null }
    });

    expect(wrapper.find("ul > li").exists()).toBeFalsy();
  });

  it("emits answer-marked event when answer is marked", () => {
    const answer = "answer";
    const wrapper = shallowMount(QuizQuestion);

    wrapper.vm.onAnswerMarked(answer);

    expect(wrapper.emitted()).toEqual({ "answer-marked": [[answer]] });
  });
});
