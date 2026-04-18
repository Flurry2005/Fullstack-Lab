import Database from "../services/Database.ts";

class ExerciceModel {
  async GetExercices() {
    return await Database.db.collection("exercices").find({}).toArray();
  }
}

export default new ExerciceModel();
