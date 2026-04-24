import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("invitations", (table) => {
    table.text("groom_image");
    table.text("bride_image");

    table.json("story_images"); // kalau belum ada
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("invitations", (table) => {
    table.dropColumn("groom_image");
    table.dropColumn("bride_image");
    table.dropColumn("story_images");
  });
}
