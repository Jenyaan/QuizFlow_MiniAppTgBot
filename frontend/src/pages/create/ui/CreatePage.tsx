import { useNavigate } from "react-router-dom";

import { useCreateQuiz } from "../model/useCreateQuiz";

import "../styles/CreatePage.css";
import "../styles/CreateForm.css";

import { QuizSettings } from "../../../widgets/quizCreator/ui/QuizSettings";
import { QuestionsSection } from "../../../widgets/quizCreator/ui/QuestionsSection";

export function CreatePage() {
  const navigate = useNavigate();

  const {
    settings,
    questions,
    updateSettings,
    addQuestion,
    removeQuestion,
    updateQuestion,
    handleSubmit,
  } = useCreateQuiz();

  return (
    <section className="create-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Назад
      </button>

      <span className="eyebrow">ТВОЙ КОНСТРУКТОР</span>

      <h1>Создать тест</h1>

      <p className="page-description">
        Создай собственный тест, настрой правила прохождения
        и поделись им с другими пользователями.
      </p>

      <form className="create-form" onSubmit={handleSubmit}>
        <QuizSettings
          settings={settings}
          onChange={updateSettings}
          questionCount={questions.length}
        />

        <QuestionsSection
          questions={questions}
          onAdd={addQuestion}
          onRemove={removeQuestion}
          onUpdate={updateQuestion}
        />

        <div className="create-form-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Отмена
          </button>

          <button type="submit" className="submit-quiz-button">
            Создать тест →
          </button>
        </div>
      </form>
    </section>
  );
}