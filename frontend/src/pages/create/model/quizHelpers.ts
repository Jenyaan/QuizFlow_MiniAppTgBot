import type { Question } from "../../../entities/quiz/types";

export function createQuestion(): Question {
  const answers = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    text: "",
  }));

  return {
    id: Date.now() + Math.random(),
    text: "",
    answers,
    correctAnswerId: answers[0].id,
  };
}
