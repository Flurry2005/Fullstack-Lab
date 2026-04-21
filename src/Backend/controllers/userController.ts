import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWTModel from "../models/JWT.ts";
import { ObjectId } from "mongodb";
import userModel from "../models/userModel.ts";
import type { Session } from "../../Frontend/types/Session.ts";
import type { Exercice } from "../../Frontend/types/Exercice.ts";
import type { User } from "../../Frontend/types/User.ts";
import Sessions from "../models/sessionModel.ts";
import Users from "../models/userModel.ts";
import Workouts from "../models/workoutModel.ts";

class UserController {
  async login(req: Request<{}, {}, LoginBody>, res: Response) {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user)
      return res.status(300).json({ success: false, data: "Email not found!" });

    if (await bcrypt.compare(password, user.passwordHash)) {
      const userObj = user.toObject();
      //@ts-ignore
      delete userObj.passwordHash;
      const token = JWTModel.createJwtToken(user._id, user.username, email);
      const expiry = new Date(Date.now() + 1000 * 60 * 60);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: expiry,
      });
      return res.status(200).json({ success: true, data: userObj });
    } else {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password!" });
    }
  }
  async register(req: Request<{}, {}, RegisterBody>, res: Response) {
    const { fullname, username, email, password } = req.body;
    if (await Users.findOne({ username: username })) {
      return res
        .status(409)
        .json({ success: false, error: "Username already exists!" });
    }
    if (await Users.findOne({ email: email })) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists!" });
    }
    await Users.insertOne({
      fullname,
      username,
      email,
      passwordHash: await bcrypt.hash(password, 12),
    });

    return res
      .status(200)
      .json({ succes: true, data: "Account successfully registered!" });
  }
  async updateUser(req: Request<{}, {}, User>, res: Response) {
    const user = req.body as User;
    if (
      !(await Users.findOne({ username: user.username, email: user.email }))
    ) {
      return res
        .status(409)
        .json({ success: false, error: "Username or email doesnt exists!" });
    }
    await Users.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { ...user } },
    );

    return res
      .status(200)
      .json({ succes: true, data: "Account successfully updated!" });
  }
  async createWorkout(req: Request<{}, {}, WorkoutBody>, res: Response) {
    const { workoutName, workoutDesc, tags, exercices } = req.body;
    const userId = new ObjectId(res.locals.jwt.userId) as ObjectId;
    if (await Users.findOne({ _id: userId })) {
      await Workouts.insertOne({
        userId: res.locals.jwt.userId,
        workoutName: workoutName,
        workoutDesc: workoutDesc,
        tags: tags!,
        exercices: exercices,
      });
      return res.status(200).json({ success: true, data: "Workout Created" });
    }

    return res.status(404).json({ succes: false, error: "User not found!" });
  }
  async getWorkouts(req: Request<{}, {}, any>, res: Response) {
    const userId = new ObjectId(res.locals.jwt.userId) as ObjectId;
    if (await Users.findOne({ _id: userId })) {
      const workouts = await Workouts.find({
        userId: res.locals.jwt.userId,
      });
      return res.status(200).json({ success: true, data: workouts });
    }

    return res.status(404).json({ succes: false, error: "User not found!" });
  }
  async getSessions(req: Request<{}, {}, any>, res: Response) {
    const userId = new ObjectId(res.locals.jwt.userId) as ObjectId;
    if (await Users.findOne({ _id: userId })) {
      const workouts = await Sessions.find({ userId: res.locals.jwt.userId });
      return res.status(200).json({ success: true, data: workouts });
    }

    return res.status(404).json({ succes: false, error: "User not found!" });
  }

  async addSession(req: Request<{}, {}, any>, res: Response) {
    const { workoutId, date } = req.body;
    const userId = new ObjectId(res.locals.jwt.userId) as ObjectId;
    if (await Users.findOne({ _id: userId })) {
      const workout = await Workouts.findOne({ _id: new ObjectId(workoutId) });

      if (!workout)
        return res
          .status(404)
          .json({ succes: false, error: "Workout not found!" });

      return await Sessions.insertOne({
        userId: res.locals.jwt.userId,
        workoutId: workoutId,
        completed: false,
        date: new Date(date),
        exercices: workout.exercices,
      });
      return res.status(200).json({ success: true, data: "Session added" });
    }

    return res.status(404).json({ succes: false, error: "User not found!" });
  }
  async updateSession(req: Request<{}, {}, UpdateSessionBody>, res: Response) {
    const { session } = req.body;
    const userId = new ObjectId(res.locals.jwt.userId) as ObjectId;
    const user = await Users.findOne({ _id: userId });
    if (user && res.locals.jwt.userId === session.userId) {
      await Sessions.updateOne(
        { _id: new ObjectId(session._id) },
        {
          $set: {
            completed: session.completed,
            exercices: session.exercices,
          },
        },
      );
      return res.status(200).json({ success: true, data: "Session updated" });
    }

    return res.status(404).json({ succes: false, error: "User not found!" });
  }
}

type LoginBody = {
  email: string;
  password: string;
};
type RegisterBody = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};
type WorkoutBody = {
  workoutName: string;
  workoutDesc: string;
  tags?: [];
  exercices: Exercice[];
};
type UpdateSessionBody = {
  session: Session;
};

export default new UserController();
