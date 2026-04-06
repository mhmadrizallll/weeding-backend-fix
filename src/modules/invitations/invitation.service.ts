import { InvitationRepository } from "./invitation.repository";

export const InvitationService = {
  async getAll() {
    return InvitationRepository.findAll();
  },

  async getBySlug(slug: string) {
    return InvitationRepository.findBySlug(slug);
  },

  async getById(id: number) {
    return InvitationRepository.findById(id);
  },

  async create(data: any) {
    return InvitationRepository.create(data);
  },

  async update(id: number, data: any) {
    return InvitationRepository.updateById(id, data);
  },

  async delete(id: number) {
    return InvitationRepository.deleteById(id);
  },
};