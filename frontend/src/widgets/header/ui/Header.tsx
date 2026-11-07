import "./Header.css";

export function Header() {

    return (
     <header className="topbar">
        <button className="brand">
          <span className="brand-icon">Q</span>
          <span>
            Quiz<span className="brand-accent">Flow</span>
          </span>
        </button>

        <div className="profile">
          <div className="profile-info">
            <span className="profile-name">Alex Morgan</span>
            <span className="profile-username">@alexmorgan</span>
          </div>
          <div className="avatar">AM</div>
          <button className="icon-button" aria-label="Профиль">
            ⚙
          </button>
        </div>
      </header>
    );
}