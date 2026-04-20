import { ObjectId } from "mongodb";
import Database from "../services/Database.ts";
import bcrypt from "bcrypt";
import type { User } from "../../Frontend/types/User.ts";
class UserModel {
  async GetUser({
    email,
    _id,
    username,
  }: {
    email?: string;
    _id?: ObjectId;
    username?: string;
  }) {
    const query: any = {};

    if (email) query.email = email;
    if (_id) query._id = _id;
    if (username) query.username = username;

    return await Database.db.collection("users").findOne(query);
  }

  async CreateUser({
    fullname,
    username,
    email,
    password,
  }: {
    fullname: string;
    username?: string;
    email: string;
    password: string;
  }) {
    return await Database.db.collection("users").insertOne({
      fullname,
      username,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      createdAt: new Date(),
    });
  }
  async UpdateUser(user: User) {
    const { _id, ...updateData } = user;

    return await Database.db
      .collection("users")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
  }
}

export default new UserModel();
