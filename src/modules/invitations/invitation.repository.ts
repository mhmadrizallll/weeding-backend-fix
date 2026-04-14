import db from "../../config/db";

export const InvitationRepository = {
  async create(data: any) {
    const [invitation] = await db("invitations").insert(data).returning("*");
    return invitation;
  },

  async findAll() {
    return db("invitations").orderBy("id", "desc");
  },

  async findAllByUserId(userId: number) {
    return db("invitations").where({ user_id: userId }).orderBy("id", "desc");
  },

  async findById(id: number) {
    return db("invitations").where({ id }).first();
  },

  async findByIdAndUserId(id: number, userId: number) {
    return db("invitations").where({ id, user_id: userId }).first();
  },

  async updateById(id: number, data: any) {
    const [updated] = await db("invitations")
      .where({ id })
      .update(data)
      .returning("*");

    return updated;
  },

  async updateByIdAndUserId(id: number, userId: number, data: any) {
    const [updated] = await db("invitations")
      .where({ id, user_id: userId })
      .update(data)
      .returning("*");

    return updated;
  },

  async deleteById(id: number) {
    return db("invitations").where({ id }).del();
  },

  async deleteByIdAndUserId(id: number, userId: number) {
    return db("invitations").where({ id, user_id: userId }).del();
  },

  async findBySlug(slug: string) {
    return db("invitations").where({ slug, is_published: true }).first();
  },

  async findBySlugAny(slug: string) {
    return db("invitations").where({ slug }).first();
  },
};
