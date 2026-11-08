export type Answer = {
  id: number;
  text: string;
};

export type Question = {
  id: number;
  text: string;
  answers: Answer[];
  correctAnswerId: number;
};

export type AttemptMode = "once" | "limited";

export type CreateQuizSettings = {
  title: string;
  description: string; // необязательное при заполнении поле
  passwordProtected: boolean;
  password: string;
  showPassword: boolean;
  timeLimit: number;
  unlimitedTime: boolean;
  attemptMode: AttemptMode;
  maxAttempts: number;
  questionsPerAttempt: number;
};