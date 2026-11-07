import "./StatistaCard.css";

export function StatistaCard() {

    return (
        <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon books-icon">📚</div>
                <div className="stat-content">
                  <span className="stat-label">JavaScript Fundamentals</span>
                  <strong className="stat-value">
                    90%
                  </strong>
                  <span className="stat-description">
                    18 из 20 правильных ответов · Пройден сегодня
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon books-icon">📚</div>
                <div className="stat-content">
                  <span className="stat-label">Пройдено тестов</span>
                  <strong className="stat-value">24</strong>
                  <span className="stat-description">
                    Твой путь к новым знаниям
                  </span>
                </div>
              </div>
        </section>
    );
}