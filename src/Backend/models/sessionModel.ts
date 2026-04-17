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
    return await Database.db.collection("sessions").insertOne({
      userId: userId,
      workoutId: workoutId,
      completed: false,
      date: new Date(date),
    });
  }
  async updateSession({ session }: { session: Session }) {
    return await Database.db.collection("sessions").updateOne(
      { _id: new ObjectId(session._id) },
      {
        $set: {
          completed: session.completed,
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
