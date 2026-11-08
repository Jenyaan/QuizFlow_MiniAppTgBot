import { useState } from "react";
import type { FormEvent } from "react";


import { createQuestion } from "./quizHelpers";
import type { CreateQuizSettings, Question } from "../../../entities/quiz/types";

export function useCreateQuiz() {
    const [settings, setSettings] = useState<CreateQuizSettings>({
    title: "",
    description: "",
    passwordProtected: false,
    password: "",
    showPassword: false,
    timeLimit: 30,
    unlimitedTime: true,
    attemptMode: "once",
    maxAttempts: 3,
    questionsPerAttempt: 1,
    });

  const [questions, setQuestions] = useState<Question[]>([
    createQuestion(),
  ]);

  const updateSettings = (
    updates: Partial<CreateQuizSettings>
  ) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const addQuestion = () => {
    if (questions.length >= 100) return;

    setQuestions((prev) => [...prev, createQuestion()]);
  };

  const removeQuestion = (questionId: number) => {
    setQuestions((prev) =>
      prev.filter((question) => question.id !== questionId)
    );
  };

  const updateQuestion = (
    questionId: number,
    updates: Partial<Question>
  ) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? { ...question, ...updates }
          : question
      )
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!settings.title.trim()) {
      alert("Введите название теста");
      return;
    }

    if (
      settings.passwordProtected &&
      settings.password.trim().length < 4
    ) {
      alert("Пароль должен содержать минимум 4 символа");
      return;
    }

    if (questions.length === 0) {
      alert("Добавьте хотя бы один вопрос");
      return;
    }

    const invalidQuestion = questions.some(
      (question) =>
        !question.text.trim() ||
        question.answers.some((answer) => !answer.text.trim())
    );

    if (invalidQuestion) {
      alert("Заполните все вопросы и варианты ответов");
      return;
    }

    const quiz = {
      title: settings.title.trim(),
      password: settings.passwordProtected
        ? settings.password
        : null,
      timeLimit: settings.unlimitedTime
        ? null
        : settings.timeLimit,
      attemptMode: settings.attemptMode,
      maxAttempts:
        settings.attemptMode === "once"
          ? 1
          : settings.maxAttempts,
      questionsPerAttempt: settings.questionsPerAttempt,
      questions,
    };

    console.log("Созданный тест:", quiz);

    alert("Тест подготовлен! Пока данные не сохраняются на сервере.");
  };

  return {
    settings,
    questions,
    updateSettings,
    addQuestion,
    removeQuestion,
    updateQuestion,
    handleSubmit,
  };
}