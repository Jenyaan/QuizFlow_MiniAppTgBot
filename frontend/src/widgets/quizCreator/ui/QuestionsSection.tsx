
import type { Question } from "../../../entities/quiz/types";
import { QuestionEditor } from "./QuestionEditor";

import "../styles/QuestionsSection.css";

type Props = {
  questions: Question[];
  onAdd: () => void;
  onRemove: (questionId: number) => void;
  onUpdate: (questionId: number, updates: Partial<Question>) => void;
};

export function QuestionsSection({
  questions,
  onAdd,
  onRemove,
  onUpdate,
}: Props) {
  return (
    <div className="form-section">
      <div className="form-section-heading questions-heading">
        <div className="form-section-icon">📝</div>

        <div>
          <h2>Вопросы теста</h2>
          <p>Добавляй вопросы и отмечай правильные ответы</p>
        </div>

        <span className="question-counter">
          {questions.length}/100
        </span>
      </div>

      <div className="questions-list">
        {questions.map((question, index) => (
          <QuestionEditor
            key={question.id}
            question={question}
            questionIndex={index}
            canRemove={questions.length > 1}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      <button
        type="button"
        className="add-question-button"
        onClick={onAdd}
        disabled={questions.length >= 100}
      >
        + Добавить вопрос
      </button>

      <p className="field-hint questions-limit">
        Можно добавить до 100 вопросов в один тест.
      </p>
    </div>
  );
}