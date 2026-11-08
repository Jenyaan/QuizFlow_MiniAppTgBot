import type { CreateQuizSettings } from "../../../entities/quiz/types";

import "../styles/QuizSettings.css";

type Props = {
  settings: CreateQuizSettings;
  questionCount: number;
  onChange: (updates: Partial<CreateQuizSettings>) => void;
};

export function QuizSettings({
  settings,
  questionCount,
  onChange,
}: Props) {
  return (
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
          value={settings.title}
          onChange={(event) =>
            onChange({ title: event.target.value })
          }
          maxLength={100}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quiz-description">
            Описание теста <span className="optional-label">(необязательно)</span>
        </label>

        <textarea
            id="quiz-description"
            placeholder="Кратко расскажите, о чём этот тест..."
            value={settings.description}
            onChange={(event) =>
            onChange({ description: event.target.value })
            }
            maxLength={500}
            rows={3}
        />

        <p className="field-hint">
            До 500 символов. Описание поможет пользователям понять содержание теста.
        </p>
      </div>

      <div className="form-group">
        <label>Время прохождения</label>

        <label className="checkbox-option">
          <input
            type="checkbox"
            checked={settings.unlimitedTime}
            onChange={(event) =>
              onChange({ unlimitedTime: event.target.checked })
            }
          />
          <span>Без ограничения времени</span>
        </label>

        {!settings.unlimitedTime && (
          <div className="inline-input">
            <input
              type="number"
              min={1}
              max={1440}
              value={settings.timeLimit}
              onChange={(event) =>
                onChange({ timeLimit: Number(event.target.value) })
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
            checked={settings.passwordProtected}
            onChange={(event) =>
              onChange({
                passwordProtected: event.target.checked,
                ...(!event.target.checked && { password: "" }),
              })
            }
          />
          <span>Защитить тест паролем</span>
        </label>

        {settings.passwordProtected && (
          <div className="password-input-wrapper">
            <input
              type={settings.showPassword ? "text" : "password"}
              placeholder="Придумайте пароль"
              value={settings.password}
              onChange={(event) =>
                onChange({ password: event.target.value })
              }
              minLength={4}
              maxLength={64}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                onChange({ showPassword: !settings.showPassword })
              }
            >
              {settings.showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>
        )}

        <p className="field-hint">
          {settings.passwordProtected
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
              checked={settings.attemptMode === "once"}
              onChange={() => onChange({ attemptMode: "once" })}
            />
            <span>
              <strong>Один раз</strong>
              <small>
                Пользователь сможет пройти тест только один раз
              </small>
            </span>
          </label>

          <label className="radio-option">
            <input
              type="radio"
              name="attemptMode"
              checked={settings.attemptMode === "limited"}
              onChange={() => onChange({ attemptMode: "limited" })}
            />
            <span>
              <strong>Ограниченное количество</strong>
              <small>
                Можно установить максимальное число попыток
              </small>
            </span>
          </label>
        </div>

        {settings.attemptMode === "limited" && (
          <div className="inline-input">
            <input
              type="number"
              min={1}
              max={100}
              value={settings.maxAttempts}
              onChange={(event) =>
                onChange({ maxAttempts: Number(event.target.value) })
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
            max={Math.min(100, questionCount)}
            value={settings.questionsPerAttempt}
            onChange={(event) =>
              onChange({
                questionsPerAttempt: Math.min(
                  Math.max(1, Number(event.target.value)),
                  Math.min(100, questionCount)
                ),
              })
            }
          />
          <span>из {questionCount} вопросов</span>
        </div>

        <p className="field-hint">
          Если вопросов больше, чем выбрано для прохождения,
          система случайным образом выберет нужное количество.
        </p>
      </div>
    </div>
  );
}