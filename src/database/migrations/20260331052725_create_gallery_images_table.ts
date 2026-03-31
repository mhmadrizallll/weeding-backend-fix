import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("gallery_images", (table) => {
    table.increments("id").primary();

    table
      .integer("invitation_id")
      .unsigned()
      .references("id")
      .inTable("invitations")
      .onDelete("CASCADE");

    table.string("image_url").notNullable();
    table.integer("sort_order").defaultTo(0);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("gallery_images");
}