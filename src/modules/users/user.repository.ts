import db from "../../config/db";

export const UserRepository = {
  async findAllUsersOnly() {
    return db("users")
      .select("id", "name", "email", "role")
      .whereIn("role", ["user"])
      .orderBy("name", "asc");
  },

  async getAllUsers() {
    return db("users")
      .select("id", "name", "email", "role")
      .orderBy("id", "desc");
  },

  async getAssignableUsers() {
    return db("users")
      .select("id", "name", "email", "role")
      .where("role", "user")
      .orderBy("name", "asc");
  },
};