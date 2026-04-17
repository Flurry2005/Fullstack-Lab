import Database from "../services/Database.ts";

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
      date: new Date(date),
    });
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
