import type { Question } from "../../../entities/quiz/types";
import { AnswerEditor } from "./AnswerEditor";

import "../styles/QuestionEditor.css";

type Props = {
  question: Question;
  questionIndex: number;
  canRemove: boolean;
  onRemove: (questionId: number) => void;
  onUpdate: (questionId: number, updates: Partial<Question>) => void;
};

export function QuestionEditor({
  question,
  questionIndex,
  canRemove,
  onRemove,
  onUpdate,
}: Props) {
  const updateAnswerText = (answerId: number, text: string) => {
    const answers = question.answers.map((answer) =>
      answer.id === answerId ? { ...answer, text } : answer
    );

    onUpdate(question.id, { answers });
  };

  const setCorrectAnswer = (answerId: number) => {
    onUpdate(question.id, { correctAnswerId: answerId });
  };

  const addAnswer = () => {
    if (question.answers.length >= 8) return;

    const newAnswer = {
      id: Date.now() + Math.random(),
      text: "",
    };

    onUpdate(question.id, {
      answers: [...question.answers, newAnswer],
    });
  };

  const removeAnswer = (answerId: number) => {
    if (question.answers.length <= 2) return;

    const answers = question.answers.filter(
      (answer) => answer.id !== answerId
    );

    const correctAnswerId =
      question.correctAnswerId === answerId
        ? answers[0].id
        : question.correctAnswerId;

    onUpdate(question.id, {
      answers,
      correctAnswerId,
    });
  };

  return (
    <div className="question-editor">
      <div className="question-editor-heading">
        <h3>Вопрос {questionIndex + 1}</h3>

        {canRemove && (
          <button
            type="button"
            className="remove-question"
            onClick={() => onRemove(question.id)}
          >
            Удалить
          </button>
        )}
      </div>

      <div className="form-group">
        <label>Текст вопроса</label>

        <textarea
          placeholder="Введите свой вопрос..."
          value={question.text}
          onChange={(event) =>
            onUpdate(question.id, { text: event.target.value })
          }
          rows={3}
          maxLength={1000}
          required
        />
      </div>

      <div className="answers-heading">
        <label>Варианты ответов</label>
        <span>{question.answers.length}/8</span>
      </div>

      <p className="field-hint">
        Отметь кружком правильный ответ.
      </p>

      <div className="answers-list">
        {question.answers.map((answer, index) => (
          <AnswerEditor
            key={answer.id}
            answer={answer}
            answerIndex={index}
            questionId={question.id}
            isCorrect={question.correctAnswerId === answer.id}
            canRemove={question.answers.length > 2}
            onTextChange={updateAnswerText}
            onCorrectChange={setCorrectAnswer}
            onRemove={removeAnswer}
          />
        ))}
      </div>

      {question.answers.length < 8 && (
        <button
          type="button"
          className="add-answer-button"
          onClick={addAnswer}
        >
          + Добавить вариант ответа
        </button>
      )}
    </div>
  );
}