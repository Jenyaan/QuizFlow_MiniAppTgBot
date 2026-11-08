import "../styles/AnswerEditor.css";

type Answer = {
  id: number;
  text: string;
};

type Props = {
  answer: Answer;
  answerIndex: number;
  questionId: number;
  isCorrect: boolean;
  canRemove: boolean;
  onTextChange: (answerId: number, text: string) => void;
  onCorrectChange: (answerId: number) => void;
  onRemove: (answerId: number) => void;
};

export function AnswerEditor({
  answer,
  answerIndex,
  questionId,
  isCorrect,
  canRemove,
  onTextChange,
  onCorrectChange,
  onRemove,
}: Props) {
  return (
    <div className="answer-editor">
      <input
        type="radio"
        name={`correct-${questionId}`}
        checked={isCorrect}
        onChange={() => onCorrectChange(answer.id)}
        aria-label={`Правильный ответ ${answerIndex + 1}`}
      />

      <span className="answer-letter">
        {String.fromCharCode(65 + answerIndex)}
      </span>

      <input
        type="text"
        placeholder={`Вариант ответа ${answerIndex + 1}`}
        value={answer.text}
        onChange={(event) =>
          onTextChange(answer.id, event.target.value)
        }
        maxLength={300}
        required
      />

      {canRemove && (
        <button
          type="button"
          className="remove-answer"
          onClick={() => onRemove(answer.id)}
          aria-label="Удалить ответ"
        >
          ×
        </button>
      )}
    </div>
  );
}