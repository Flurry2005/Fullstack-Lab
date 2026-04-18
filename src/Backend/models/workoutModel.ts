import type { Exercice } from "../../Frontend/types/Exercice.ts";
import Database from "../services/Database.ts";

class WorkoutModel {
  async CreateWorkout({
    userId,
    workoutName,
    tags,
    exercices,
  }: {
    userId: string;
    workoutName: string;
    tags: string[];
    exercices: Exercice[];
  }) {
    return await Database.db.collection("workouts").insertOne({
      userId: userId,
      workoutName: workoutName,
      tags: tags,
      exercices: exercices,
    });
  }
  async GetWorkouts({ userId }: { userId: string }) {
    return await Database.db
      .collection("workouts")
      .find({
        userId: userId,
      })
      .toArray();
  }
}

export default new WorkoutModel();
