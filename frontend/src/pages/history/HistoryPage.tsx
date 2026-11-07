
import { useNavigate } from "react-router-dom";

import { ResultCard } from "../../widgets/resultCard/ui/ResultCard.tsx";
import type { Result } from "../../entities/result/types.ts";

import "./HistoryPage.css";

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

export function HistoryPage() {
  const navigate = useNavigate();

  return (
    <section className="history-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
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
          <ResultCard
            key={`${result.title}-${result.date}-${index}`}
            result={result}
          />
        ))}

        {results.length === 0 && (
          <div className="empty-state">
            <span>📚</span>
            <h3>История пока пуста</h3>
            <p>
              Пройди свой первый тест, чтобы увидеть результат.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
