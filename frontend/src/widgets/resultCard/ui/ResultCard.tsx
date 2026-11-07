import type { Result } from "../../../entities/result/types.ts";
import "./ResultCard.css";

type ResultCardProps = {
  result: Result;
};

export function ResultCard({ result }: ResultCardProps) {
  return (
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
}