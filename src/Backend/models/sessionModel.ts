import Database from "../services/Database.ts";
import type { Session } from "../../Frontend/types/Session.ts";
import { ObjectId } from "mongodb";
class SessionModel {
  async addSession({
    userId,
    workoutId,
    date,
  }: {
    userId: string;
    workoutId: string;
    date: Date;
  }) {
    const workout = await Database.db
      .collection("workouts")
      .findOne({ _id: new ObjectId(workoutId) });
    return await Database.db.collection("sessions").insertOne({
      userId: userId,
      workoutId: workoutId,
      completed: false,
      date: new Date(date),
      exercices: workout!.exercices,
    });
  }
  async updateSession({ session }: { session: Session }) {
    return await Database.db.collection("sessions").updateOne(
      { _id: new ObjectId(session._id) },
      {
        $set: {
          completed: session.completed,
          exercices: session.exercices,
        },
      },
    );
  }
  async GetSessions({ userId }: { userId: string }) {
    return await Database.db
      .collection("sessions")
      .find({
        userId: userId,
      })
      .toArray();
  }
}

export default new SessionModel();
