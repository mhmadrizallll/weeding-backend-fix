import db from "../../config/db";

export const RsvpRepository = {
  async create(data: any) {
    const [rsvp] = await db("rsvps").insert(data).returning("*");
    return rsvp;
  },

  async findByInvitationId(invitationId: number) {
    return db("rsvps")
      .where({ invitation_id: invitationId })
      .orderBy("created_at", "desc");
  },

  async findById(id: number) {
    return db("rsvps").where({ id }).first();
  },
};