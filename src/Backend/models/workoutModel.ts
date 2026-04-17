import Database from "../services/Database.ts";

class WorkoutModel {
  async CreateWorkout({
    userId,
    workoutName,
    tags,
  }: {
    userId: string;
    workoutName: string;
    tags: string[];
  }) {
    return await Database.db.collection("workouts").insertOne({
      userId: userId,
      workoutName: workoutName,
      tags: tags,
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
