import QuizTitle from "@/components/QuizTitle";
import { shallowMount } from "@vue/test-utils";

describe("QuizTitle", () => {
  it("renders with minimal props", () => {
    const wrapper = shallowMount(QuizTitle, {
      propsData: { questionsCount: 20, questionIndex: 7 }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("renders title when passed question count and current index ", () => {
    const title = "Question 4/10";
    const wrapper = shallowMount(QuizTitle, {
      propsData: { questionsCount: 10, questionIndex: 3 }
    });
    expect(wrapper.text()).toBe(title);
  });
});
