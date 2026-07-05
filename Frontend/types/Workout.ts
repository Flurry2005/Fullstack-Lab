import type { Exercice } from "./Exercice";

export type Workout = {
  _id: string;
  userId: string;
  workoutName: string;
  workoutDesc: string;
  tags: string[];
  exercices: Exercice[];
};
