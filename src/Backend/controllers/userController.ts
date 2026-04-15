import type { Request, Response, NextFunction } from "express";
import Database from "../services/Database.ts";
import bcrypt from "bcrypt";

class UserController {
  async login(req: Request<{}, {}, LoginBody>, res: Response) {
    const { email, password } = req.body;
    const user = await Database.db.collection("users").findOne({ email });
    if (!user)
      return res.status(300).json({ success: false, data: "Email not found!" });

    if (await bcrypt.compare(password, user.passwordHash)) {
      delete user.passwordHash;
      return res.status(200).json({ success: true, data: user });
    } else {
      return res
        .status(300)
        .json({ success: false, error: "Incorrect password!" });
    }
  }
  async register(req: Request<{}, {}, RegisterBody>, res: Response) {
    const { fullname, username, email, password } = req.body;
    if (await Database.db.collection("users").findOne({ username: username })) {
      return res
        .status(409)
        .json({ success: false, error: "Username already exists!" });
    }
    if (await Database.db.collection("users").findOne({ email: email })) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists!" });
    }
    await Database.db.collection("users").insertOne({
      fullname,
      username,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      createdAt: new Date(),
    });

    return res
      .status(200)
      .json({ succes: true, data: "Account successfully registered!" });
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

export default new UserController();
