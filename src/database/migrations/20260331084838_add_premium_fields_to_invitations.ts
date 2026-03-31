import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("invitations", (table) => {
    table.string("cover_image").nullable();
    table.json("gallery_images").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("invitations", (table) => {
    table.dropColumn("cover_image");
    table.dropColumn("gallery_images");
  });
}