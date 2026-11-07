
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import "./styles/App.css";

import { Header } from "../widgets/header/index.ts";
import { router } from "./router.tsx";
import { Footer } from "../widgets/footer/Footer.tsx";

function App() {
  const telegram = window.Telegram?.WebApp;
  const user = telegram?.initDataUnsafe?.user;

  const firstName = user?.first_name ?? "Гость";

  useEffect(() => {
    telegram?.ready();
    telegram?.expand();
  }, []);

  return (
    <div className="app">
      <Header
        firstName={firstName}
        username={user?.username}
        userId={user?.id}
        avatarUrl={user?.photo_url}
      />

      <main className="main-content">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
