import { useNavigate } from "react-router-dom";

import "./CreatePage.css";

export function CreatePage() {
  const navigate = useNavigate();

  return (
    <section className="create-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Назад
      </button>

      <span className="eyebrow">ТВОЙ КОНСТРУКТОР</span>

      <h1>Создать тест</h1>

      <p className="page-description">
        Создавай собственные тесты, добавляй вопросы
        и делись ими с другими пользователями.
      </p>

      <div className="coming-soon">
        <span>✨</span>
        <h2>Скоро появится</h2>
        <p>
          Здесь будет находиться конструктор тестов.
        </p>
      </div>
    </section>
  );
}