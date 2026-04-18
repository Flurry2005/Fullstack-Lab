import type { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import userModel from "../models/userModel.ts";
import exerciceModel from "../models/exerciceModel.ts";

class ExerciceController {
  async getWorkouts(req: Request<{}, {}, any>, res: Response) {
    const userId = new ObjectId(res.locals.jwt.userId) as ObjectId;
    if (await userModel.GetUser({ _id: userId })) {
      const exercices = await exerciceModel.GetExercices();
      return res.status(200).json({ success: true, data: exercices });
    }

    return res.status(404).json({ succes: false, error: "User not found!" });
  }
}

export default new ExerciceController();
