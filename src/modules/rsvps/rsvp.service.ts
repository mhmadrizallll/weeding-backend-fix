import { RsvpRepository } from "./rsvp.repository";

export const RsvpService = {
  async getByInvitationId(invitationId: number) {
    return RsvpRepository.findByInvitationId(invitationId);
  },

  async create(data: any) {
    return RsvpRepository.create(data);
  },
};