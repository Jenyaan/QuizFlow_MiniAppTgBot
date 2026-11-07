import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


import "./HomePage.css";
import { StatistaCard } from "../../widgets/statistaCard/ui/StatistaCard";
import { ResultCard } from "../../widgets/resultCard/ui/ResultCard";
import type { Result } from "../../entities/result/types";

type Quiz = {
  id: number;
  title: string;
  code: string;
  description: string;
  category: string;
  icon: string;
  questions: number;
  plays: number;
  isPublic: boolean;
  hasPassword: boolean;
  color: string;
};

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    code: "JS-2048",
    description: "Проверь свои знания JavaScript",
    category: "Программирование",
    icon: "💻",
    questions: 20,
    plays: 1240,
    isPublic: true,
    hasPassword: false,
    color: "purple",
  },
  {
    id: 2,
    title: "English Vocabulary",
    code: "EN-1052",
    description: "Проверь свой словарный запас",
    category: "Языки",
    icon: "🌍",
    questions: 15,
    plays: 856,
    isPublic: false,
    hasPassword: true,
    color: "blue",
  },
  {
    id: 3,
    title: "General Knowledge",
    code: "GK-3021",
    description: "Насколько широк твой кругозор?",
    category: "Общие знания",
    icon: "🧠",
    questions: 25,
    plays: 2100,
    isPublic: true,
    hasPassword: false,
    color: "orange",
  },
  {
    id: 4,
    title: "Python Basics",
    code: "PY-4086",
    description: "Основы программирования на Python",
    category: "Программирование",
    icon: "🐍",
    questions: 18,
    plays: 642,
    isPublic: false,
    hasPassword: false,
    color: "green",
  },
];
const results: Result[] = [
  {
    title: "HTML & CSS Basics",
    date: "Сегодня, 14:32",
    score: 18,
    total: 20,
    percent: 90,
    icon: "🎨",
  },
  {
    title: "English Grammar",
    date: "Вчера, 18:45",
    score: 14,
    total: 20,
    percent: 70,
    icon: "📚",
  },
  {
    title: "Computer Science",
    date: "4 ноября, 12:20",
    score: 12,
    total: 20,
    percent: 60,
    icon: "⚡",
  },
];


type HomePageProps = {
  firstName?: string;
};

export function HomePage({ firstName = "Гость" }: HomePageProps) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredQuizzes = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return [];

    return quizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(query) ||
        quiz.code.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <>
      <section className="welcome">
        <div className="welcome-text">
          <span className="eyebrow">
            ТВОЁ ПРОСТРАНСТВО ЗНАНИЙ
          </span>

          <h1>
            Привет, {firstName}! <span>👋</span>
          </h1>

          <p>
            Создавай собственные тесты и делись ими
            с друзьями. Проверяй знания и учись новому!
          </p>
        </div>

        <div className="welcome-decoration">
          <span>✦</span>
          <div className="decoration-circle">Q</div>
          <span>✧</span>
        </div>
      </section>

      <section className="search-section">
        <div className="search-toolbar">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="search"
              placeholder="Найти тест по названию или коду..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <button
            className="create-button"
            onClick={() => navigate("/create")}
          >
            <span>＋</span> Создать тест
          </button>
        </div>
      </section>

      <StatistaCard />

      {search.trim() && (
        <section className="section search-results-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">РЕЗУЛЬТАТЫ ПОИСКА</span>
              <h2>Найденные тесты</h2>
            </div>

            <span className="section-count">
              {filteredQuizzes.length} тестов
            </span>
          </div>

          <div className="quiz-grid">
            {filteredQuizzes.map((quiz) => (
              <article className="quiz-card" key={quiz.id}>
                <div className="quiz-card-top">
                  <div className={`quiz-icon ${quiz.color}`}>
                    {quiz.icon}
                  </div>

                  <div className="quiz-badges">
                    <span
                      className={`visibility ${
                        quiz.isPublic ? "public" : "private"
                      }`}
                    >
                      {quiz.isPublic ? "PUBLIC" : "PRIVATE"}
                    </span>

                    {quiz.hasPassword && (
                      <span
                        className="password-badge"
                        title="Для прохождения нужен пароль"
                      >
                        <span>🔒</span>
                        Password
                      </span>
                    )}
                  </div>
                </div>

                <span className="quiz-category">
                  {quiz.category}
                </span>

                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>

                <div className="quiz-meta">
                  <span>☷ {quiz.questions} вопросов</span>
                  <span>
                    ◉ {quiz.plays.toLocaleString("ru-RU")} прохождений
                  </span>
                </div>

                <div className="quiz-card-footer">
                  <span className="quiz-code">
                    Код: {quiz.code}
                  </span>

                  <button
                    className="start-button"
                    onClick={() => {
                      if (quiz.hasPassword) {
                        alert("Для прохождения этого теста нужен пароль.");
                      } else {
                        alert(`Открытие теста: ${quiz.title}`);
                      }
                    }}
                  >
                    Пройти <span>→</span>
                  </button>
                </div>
              </article>
            ))}

            {filteredQuizzes.length === 0 && (
              <div className="empty-state">
                <span>🔎</span>
                <h3>Тесты не найдены</h3>
                <p>
                  Попробуй другое название или код теста.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="results-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ТВОЙ ПРОГРЕСС</span>
            <h2>Последние результаты</h2>
          </div>

          <button
            className="text-button"
            onClick={() => navigate("/history")}
          >
            История результатов <span>→</span>
          </button>
        </div>

        <div className="results-list">
            {results.map((result, index) => (
                <ResultCard key={index} result={result} />
            ))}
        </div>
      </section>
    </>
  );
}
