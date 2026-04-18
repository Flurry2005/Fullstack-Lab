import type { Exercice } from "./Exercice";

export type Session = {
  _id: string;
  userId: string;
  date: string;
  workoutId: string;
  completed: boolean;
  exercices: Exercice[];
};
