import Quiz from "@/components/Quiz";
import { shallowMount, mount } from "@vue/test-utils";
import { QuizState, AppState } from "@/utility/enums";

describe("Quiz", () => {
  it("currentQuestion returns current question when questions are provided", () => {
    const wrapper = shallowMount(Quiz, {
      propsData: { appState: AppState.Quiz }
    });
    wrapper.setData({
      questions: [{ a: "a" }, { b: "b" }],
      currentQuestionIndex: 1
    });

    expect(wrapper.vm.currentQuestion).toEqual({ b: "b" });
  });

  it("currentQuestion returns null when questions are not provided", () => {
    const wrapper = shallowMount(Quiz, {
      propsData: { appState: AppState.Quiz }
    });
    wrapper.setData({
      questions: [],
      currentQuestionIndex: 0
    });

    expect(wrapper.vm.currentQuestion).toBeNull();
  });

  it("changes state to finished when there are no more questions", () => {
    const mockQuestions = [
      {
        answers: [{ displayName: "fake display name" }],
        answerIndex: 0
      }
    ];
    const wrapper = shallowMount(Quiz, {
      propsData: { appState: AppState.Quiz }
    });
    wrapper.setData({
      currentQuestionIndex: 0,
      questions: mockQuestions,
      quizState: QuizState.ShowingQuestion,
      questionsCount: mockQuestions.length
    });

    wrapper.vm.onAnswerMarked(mockQuestions[0].answers[0]);

    expect(wrapper.vm.quizState).toBe(QuizState.Finished);
  });

  it("changes state to showing question when there more questions", () => {
    const mockQuestions = [
      {
        answers: [{ displayName: "fake display name 1" }],
        answerIndex: 0
      },
      {
        answers: [{ displayName: "fake display name 2" }],
        answerIndex: 0
      }
    ];
    const wrapper = shallowMount(Quiz, {
      propsData: { appState: QuizState.ShowingQuestion }
    });
    wrapper.setData({
      currentQuestionIndex: 0,
      questions: mockQuestions,
      quizState: QuizState.ShowingQuestion,
      questionsCount: mockQuestions.length
    });

    wrapper.vm.onAnswerMarked(mockQuestions[0].answers[0]);

    expect(wrapper.vm.quizState).toBe(QuizState.ShowingAnswer);
  });

  it("ignores marking answer when other answer has already been marked", () => {
    const wrapper = shallowMount(Quiz, {
      propsData: { appState: AppState.Quiz }
    });
    wrapper.setData({
      quizState: QuizState.ShowingAnswer
    });

    wrapper.vm.onAnswerMarked();

    expect(wrapper.vm.quizState).toBe(QuizState.ShowingAnswer);
  });

  it("emits quiz-finished event when quiz is finished", () => {
    const wrapper = mount(Quiz, {
      propsData: { appState: AppState.Quiz }
    });

    wrapper.vm.finishQuiz();

    expect(wrapper.emitted()).toEqual({ "quiz-finished": [[]] });
  });
});
