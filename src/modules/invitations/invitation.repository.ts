import db from "../../config/db";

export const InvitationRepository = {
  async findAll() {
    return db("invitations").select("*").orderBy("id", "desc");
  },

  async findBySlug(slug: string) {
    return db("invitations").where({ slug }).first();
  },

  async findById(id: number) {
    return db("invitations").where({ id }).first();
  },

  async create(data: any) {
    const [invitation] = await db("invitations").insert(data).returning("*");
    return invitation;
  },

  async update(id: number, data: any) {
    const [updated] = await db("invitations")
      .where({ id })
      .update({
        ...data,
        updated_at: db.fn.now(),
      })
      .returning("*");

    return updated;
  },

  async delete(id: number) {
    return db("invitations").where({ id }).del();
  },
};