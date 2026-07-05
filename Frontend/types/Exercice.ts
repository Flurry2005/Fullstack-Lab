import type { ObjectId } from "mongodb";
import type { Set } from "./Set";

export type Exercice = {
  _id: ObjectId;
  name: string;
  type: string;
  muscles: string[];
  sets?: Set[];
};
