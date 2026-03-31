import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("invitations", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("template_key").notNullable().defaultTo("template-a");
    table.string("slug").notNullable().unique();

    table.string("event_type").nullable(); // wedding, engagement, birthday, dll
    table.string("title").nullable();

    table.string("groom_name").nullable();
    table.string("bride_name").nullable();

    table.string("cover_title").nullable();
    table.string("cover_subtitle").nullable();

    table.text("quote").nullable();
    table.text("story").nullable();

    table.string("music_url").nullable();

    table.string("location_name").nullable();
    table.text("location_address").nullable();
    table.text("google_maps_url").nullable();

    table.date("event_date").nullable();
    table.string("event_time").nullable();

    table.boolean("is_published").defaultTo(false);

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("invitations");
}