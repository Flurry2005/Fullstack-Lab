import { Db, MongoClient } from "mongodb";
import { options } from "../config/DBoptions.ts";

class DatabaseConnection {
  #uri = "mongodb+srv://c65IWiYNe0wpIAGn@fullstacklab.chxa0xf.mongodb.net";
  db!: Db;
  #client!: MongoClient;

  async connect() {
    if (this.#client != null) return;
    console.log(options.auth);
    this.#client = new MongoClient(this.#uri, options);

    try {
      await this.#client.connect();
      this.db = this.#client.db("sample_mflix");
    } catch (error) {
      console.error(error);
    }
  }
}

export default new DatabaseConnection();
