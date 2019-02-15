import QuizCreator from "@/QuizCreator";

describe("QuizCreator", () => {
  it("throws error or invalid Category value", async () => {
    const invalidCategory = "unknown";
    const questionsCount = 0;
    const answersCount = 0;

    try {
      await QuizCreator.create(invalidCategory, questionsCount, answersCount);
    } catch (e) {
      expect(e.message).toMatch(/Unknown quiz type!: /);
    }
  });
});
