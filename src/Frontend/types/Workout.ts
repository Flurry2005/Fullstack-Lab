import type { Exercice } from "./Exercice";

export type Workout = {
  _id: string;
  userId: string;
  workoutName: string;
  tags: string[];
  exercices: Exercice[];
};
