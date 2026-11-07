import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreatePage.css";

type Answer = {
  id: number;
  text: string;
};

type Question = {
  id: number;
  text: string;
  answers: Answer[];
  correctAnswerId: number;
};

type AttemptMode = "once" | "limited";

function createQuestion(): Question {
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

export function CreatePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);
  const [unlimitedTime, setUnlimitedTime] = useState(true);

  const [attemptMode, setAttemptMode] = useState<AttemptMode>("once");
  const [maxAttempts, setMaxAttempts] = useState(3);

  const [questionsPerAttempt, setQuestionsPerAttempt] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([
    createQuestion(),
  ]);

  // Добавление вопроса
  const addQuestion = () => {
    if (questions.length >= 100) return;

    setQuestions((prev) => [...prev, createQuestion()]);
  };

  // Удаление вопроса
  const removeQuestion = (questionId: number) => {
    setQuestions((prev) =>
      prev.filter((question) => question.id !== questionId)
    );
  };

  // Изменение текста вопроса
  const updateQuestionText = (questionId: number, text: string) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? { ...question, text }
          : question
      )
    );
  };

  // Изменение текста ответа
  const updateAnswerText = (
    questionId: number,
    answerId: number,
    text: string
  ) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                answer.id === answerId
                  ? { ...answer, text }
                  : answer
              ),
            }
          : question
      )
    );
  };

  // Выбор правильного ответа
  const setCorrectAnswer = (
    questionId: number,
    answerId: number
  ) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? { ...question, correctAnswerId: answerId }
          : question
      )
    );
  };

  // Добавление варианта ответа
  const addAnswer = (questionId: number) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (
          question.id !== questionId ||
          question.answers.length >= 8
        ) {
          return question;
        }

        const newAnswer = {
          id: Date.now() + Math.random(),
          text: "",
        };

        return {
          ...question,
          answers: [...question.answers, newAnswer],
        };
      })
    );
  };

  // Удаление варианта ответа
  const removeAnswer = (
    questionId: number,
    answerId: number
  ) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (
          question.id !== questionId ||
          question.answers.length <= 2
        ) {
          return question;
        }

        const answers = question.answers.filter(
          (answer) => answer.id !== answerId
        );

        const correctAnswerId =
          question.correctAnswerId === answerId
            ? answers[0].id
            : question.correctAnswerId;

        return {
          ...question,
          answers,
          correctAnswerId,
        };
      })
    );
  };

  // Создание теста
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Введите название теста");
      return;
    }

    if (passwordProtected && password.trim().length < 4) {
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
      title: title.trim(),
      timeLimit: unlimitedTime ? null : timeLimit,
      attemptMode,
      maxAttempts:
        attemptMode === "once" ? 1 : maxAttempts,
      questionsPerAttempt,
      questions,
    };

    console.log("Созданный тест:", quiz);

    alert("Тест подготовлен! Пока данные не сохраняются на сервере.");
  };

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
        {/* Основные настройки */}
        <div className="form-section">
          <div className="form-section-heading settings-heading">
            <div>
              <h2>Настройки теста ⚙️</h2>
              <p>Основная информация и правила прохождения</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="quiz-title">Название теста</label>
            <input
              id="quiz-title"
              type="text"
              placeholder="Например, Основы программирования"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label>Время прохождения</label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={unlimitedTime}
                onChange={(event) =>
                  setUnlimitedTime(event.target.checked)
                }
              />
              <span>Без ограничения времени</span>
            </label>

            {!unlimitedTime && (
              <div className="inline-input">
                <input
                  type="number"
                  min={1}
                  max={1440}
                  value={timeLimit}
                  onChange={(event) =>
                    setTimeLimit(Number(event.target.value))
                  }
                />
                <span>минут</span>
              </div>
            )}
          </div>

          <div className="form-group">

          <label>Доступ к тесту</label>

          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={passwordProtected}
              onChange={(event) => {
                setPasswordProtected(event.target.checked);
                if (!event.target.checked) {
                  setPassword("");
                }
              }}
            />
            <span>Защитить тест паролем</span>
          </label>

          {passwordProtected && (
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Придумайте пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={4}
                maxLength={64}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
          )}

          <p className="field-hint">
            {passwordProtected
              ? "Для прохождения теста пользователю понадобится пароль."
              : "Любой пользователь сможет пройти тест по ссылке без пароля."}
          </p>
        </div>

          <div className="form-group">
            <label>Количество попыток</label>

            <div className="radio-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="attemptMode"
                  checked={attemptMode === "once"}
                  onChange={() => setAttemptMode("once")}
                />
                <span>
                  <strong>Один раз</strong>
                  <small>Пользователь сможет пройти тест только один раз</small>
                </span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="attemptMode"
                  checked={attemptMode === "limited"}
                  onChange={() => setAttemptMode("limited")}
                />
                <span>
                  <strong>Ограниченное количество</strong>
                  <small>Можно установить максимальное число попыток</small>
                </span>
              </label>
            </div>

            {attemptMode === "limited" && (
              <div className="inline-input">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={maxAttempts}
                  onChange={(event) =>
                    setMaxAttempts(Number(event.target.value))
                  }
                />
                <span>попыток на пользователя</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="questions-per-attempt">
              Вопросов за одно прохождение
            </label>

            <div className="inline-input">
              <input
                id="questions-per-attempt"
                type="number"
                min={1}
                max={Math.min(100, questions.length)}
                value={questionsPerAttempt}
                onChange={(event) =>
                  setQuestionsPerAttempt(
                    Math.min(
                      Math.max(1, Number(event.target.value)),
                      Math.min(100, questions.length)
                    )
                  )
                }
              />

              <span>из {questions.length} вопросов</span>
            </div>

            <p className="field-hint">
              Если вопросов больше, чем выбрано для прохождения,
              система случайным образом выберет нужное количество.
            </p>
          </div>
        </div>

        {/* Вопросы */}
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
            {questions.map((question, questionIndex) => (
              <div className="question-editor" key={question.id}>
                <div className="question-editor-heading">
                  <h3>Вопрос {questionIndex + 1}</h3>

                  {questions.length > 1 && (
                    <button
                      type="button"
                      className="remove-question"
                      onClick={() => removeQuestion(question.id)}
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
                      updateQuestionText(question.id, event.target.value)
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
                  {question.answers.map((answer, answerIndex) => (
                    <div className="answer-editor" key={answer.id}>
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={
                          question.correctAnswerId === answer.id
                        }
                        onChange={() =>
                          setCorrectAnswer(question.id, answer.id)
                        }
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
                          updateAnswerText(
                            question.id,
                            answer.id,
                            event.target.value
                          )
                        }
                        maxLength={300}
                        required
                      />

                      {question.answers.length > 2 && (
                        <button
                          type="button"
                          className="remove-answer"
                          onClick={() =>
                            removeAnswer(question.id, answer.id)
                          }
                          aria-label="Удалить ответ"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {question.answers.length < 8 && (
                  <button
                    type="button"
                    className="add-answer-button"
                    onClick={() => addAnswer(question.id)}
                  >
                    + Добавить вариант ответа
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="add-question-button"
            onClick={addQuestion}
            disabled={questions.length >= 100}
          >
            + Добавить вопрос
          </button>

          <p className="field-hint questions-limit">
            Можно добавить до 100 вопросов в один тест.
          </p>
        </div>

        {/* Создание */}
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