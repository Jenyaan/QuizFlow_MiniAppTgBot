
import { useMemo, useState } from "react";
import "./styles/App.css";

import { Header } from "../widgets/header/index.ts";
import { StatistaCard } from "../widgets/statistaCard/ui/StatistaCard.tsx";

type Quiz = {
  id: number;
  title: string;
  code: string;
  description: string;
  category: string;
  icon: string;
  questions: number;
  plays: number;
  difficulty: string;
  color: string;
};

type Result = {
  title: string;
  date: string;
  score: number;
  total: number;
  percent: number;
  icon: string;
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
    difficulty: "Средний",
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
    difficulty: "Лёгкий",
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
    difficulty: "Сложный",
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
    difficulty: "Средний",
    color: "green",
  },
];

const categories = [
  "Все",
  "Программирование",
  "Языки",
  "Общие знания",
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

type Page = "home" | "history" | "create";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [page, setPage] = useState<Page>("home");

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        quiz.title.toLowerCase().includes(query) ||
        quiz.code.toLowerCase().includes(query);

      const matchesCategory =
        category === "Все" || quiz.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const openPage = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ResultCard = ({ result }: { result: Result }) => (
    <article className="result-card">
      <div className="result-icon">{result.icon}</div>

      <div className="result-info">
        <h3>{result.title}</h3>
        <span>{result.date}</span>
      </div>

      <div className="result-progress">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${result.percent}%` }}
          />
        </div>
        <span>{result.percent}%</span>
      </div>

      <div className="result-score">
        <strong>{result.score}/{result.total}</strong>
        <span>баллов</span>
      </div>
    </article>
  );

  return (
    <div className="app">

      <Header />
      <main className="main-content">
        {page === "home" && (
          <>
            <section className="welcome">
              <div className="welcome-text">
                <span className="eyebrow">
                  ТВОЁ ПРОСТРАНСТВО ЗНАНИЙ
                </span>

                <h1>
                  Привет, Alex! <span>👋</span>
                </h1>

                <p>
                  Новые знания начинаются с одного вопроса.
                  Какой тест пройдёшь сегодня?
                </p>
              </div>

              <div className="welcome-decoration">
                <span>✦</span>
                <div className="decoration-circle">Q</div>
                <span>✧</span>
              </div>
            </section>

            <section className="search-section">
              <div className="search-box">
                <span className="search-icon">⌕</span>
                <input
                  type="search"
                  placeholder="Найти тест по названию или коду..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </section>

           <StatistaCard />

            <section className="section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">ИССЛЕДУЙ И УЧИСЬ</span>
                  <h2>Найди свой тест</h2>
                </div>

                <button
                  className="create-button"
                  onClick={() => openPage("create")}
                >
                  <span>＋</span> Создать тест
                </button>
              </div>

              <div className="categories">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={`category-chip ${
                      category === item ? "active" : ""
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="quiz-grid">
                {filteredQuizzes.map((quiz) => (
                  <article className="quiz-card" key={quiz.id}>
                    <div className="quiz-card-top">
                      <div className={`quiz-icon ${quiz.color}`}>
                        {quiz.icon}
                      </div>
                      <span className="difficulty">
                        {quiz.difficulty}
                      </span>
                    </div>

                    <span className="quiz-category">
                      {quiz.category}
                    </span>

                    <h3>{quiz.title}</h3>
                    <p>{quiz.description}</p>

                    <div className="quiz-meta">
                      <span>☷ {quiz.questions} вопросов</span>
                      <span>◉ {quiz.plays.toLocaleString("ru-RU")}</span>
                    </div>

                    <div className="quiz-card-footer">
                      <span className="quiz-code">
                        Код: {quiz.code}
                      </span>
                      <button className="start-button">
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

            <section className="results-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">ТВОЙ ПРОГРЕСС</span>
                  <h2>Последние результаты</h2>
                </div>

                <button
                  className="text-button"
                  onClick={() => openPage("history")}
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
        )}

        {page === "history" && (
          <section className="history-page">
            <button
              className="back-button"
              onClick={() => openPage("home")}
            >
              ← Назад
            </button>

            <span className="eyebrow">ТВОЙ ПРОГРЕСС</span>
            <h1>История результатов</h1>
            <p className="page-description">
              Здесь собраны результаты твоих пройденных тестов.
            </p>

            <div className="history-summary">
              <div>
                <span>Всего пройдено</span>
                <strong>24 теста</strong>
              </div>
              <div>
                <span>Последние попытки</span>
                <strong>{results.length}</strong>
              </div>
            </div>

            <div className="results-list history-results">
              {results.map((result, index) => (
                <ResultCard key={index} result={result} />
              ))}
            </div>
          </section>
        )}

        {page === "create" && (
          <section className="create-page">
            <button
              className="back-button"
              onClick={() => openPage("home")}
            >
              ← Назад
            </button>

            <span className="eyebrow">ТВОЙ КОНСТРУКТОР</span>
            <h1>Создать тест</h1>
            <p className="page-description">
              Здесь будет находиться конструктор собственных тестов.
            </p>

            <div className="coming-soon">
              <span>✨</span>
              <h2>Скоро появится</h2>
              <p>
                Ты сможешь создавать тесты, добавлять вопросы
                и делиться ими с другими пользователями.
              </p>
            </div>
          </section>
        )}

        <footer className="footer">
          <span>© 2026 QuizFlow</span>
          <span>Learn something new every day ✨</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
