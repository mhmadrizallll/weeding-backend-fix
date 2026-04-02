import db from "../../config/db";

export const AuthRepository = {
  async findUserByEmail(email: string) {
    return db("users").where({ email }).first();
  },

  async findUserById(id: number) {
    return db("users").where({ id }).first();
  },

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) {
    const [user] = await db("users")
      .insert({
        ...data,
        role: data.role || "user",
      })
      .returning(["id", "name", "email", "role", "created_at", "updated_at"]);

    return user;
  },
};