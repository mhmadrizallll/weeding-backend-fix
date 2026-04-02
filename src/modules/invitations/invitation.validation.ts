import { z } from "zod";

export const createInvitationSchema = z.object({
  user_id: z.number(),
  template_key: z.string().default("luxury"),
  slug: z.string().min(3),
  event_type: z.string().optional(),
  title: z.string().optional(),
  groom_name: z.string().optional(),
  bride_name: z.string().optional(),
  cover_title: z.string().optional(),
  cover_subtitle: z.string().optional(),
  quote: z.string().optional(),
  story: z.string().optional(),
  music_url: z.string().optional(),
  location_name: z.string().optional(),
  location_address: z.string().optional(),
  google_maps_url: z.string().optional(),
  event_date: z.string().optional(),
  event_time: z.string().optional(),
  is_published: z.boolean().optional(),
});

export const updateInvitationSchema = createInvitationSchema.partial();