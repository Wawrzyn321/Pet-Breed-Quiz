const AppState = Object.freeze({
  Quiz: "QUIZ",
  Menu: "MENU"
});

const QuizState = Object.freeze({
  None: "NONE",
  ShowingQuestion: "SHOWING_QUESTION",
  ShowingAnswer: "SHOWING_ANSWER",
  Finished: "FINISHED"
});

const Categories = Object.freeze({
  Dogs: "DOGS",
  Cats: "CATS",
  Both: "BOTH",
  None: "NONE"
});

const Creatures = Object.freeze({
  Dog: "DOG",
  Cat: "CAT"
});

const AnswerState = Object.freeze({
  None: "NONE",
  Bad: "BAD",
  Good: "GOOD"
});

export { AppState, QuizState, Categories, Creatures, AnswerState };
