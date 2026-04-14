import type { Knex } from "knex";


export async function up(knex: any) {
  await knex.schema.alterTable("invitations", (table: any) => {
    table.string("groom_photo");
    table.string("bride_photo");
    table.json("story_images");
  });
}

export async function down(knex: any) {
  await knex.schema.alterTable("invitations", (table: any) => {
    table.dropColumn("groom_photo");
    table.dropColumn("bride_photo");
    table.dropColumn("story_images");
  });
}

