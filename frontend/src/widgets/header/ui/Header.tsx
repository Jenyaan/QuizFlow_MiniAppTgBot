import "./Header.css";

type HeaderProps = {
  firstName?: string;
  username?: string;
  userId?: number;
  avatarUrl?: string;
};

export function Header({ firstName, username, userId, avatarUrl }: HeaderProps) {

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
            <span className="profile-name">{firstName}</span>
            <span className="profile-username">{username}</span>
          </div>
          <button
            className="icon-button"
            aria-label={`Профиль_${userId ?? "guest"}`}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Аватар пользователя"
                className="user-avatar"
              />
            ) : (
              <span>{firstName?.charAt(0).toUpperCase() ?? "Г"}</span>
            )}
          </button>
          {/* <button className="icon-button" aria-label={`Профиль_${userId}`}>
            ⚙
          </button> */}
        </div>
      </header>
    );
}