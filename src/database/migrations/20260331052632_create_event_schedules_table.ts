import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("event_schedules", (table) => {
    table.increments("id").primary();

    table
      .integer("invitation_id")
      .unsigned()
      .references("id")
      .inTable("invitations")
      .onDelete("CASCADE");

    table.string("event_name").notNullable(); // Akad, Resepsi, dll
    table.date("event_date").nullable();
    table.string("event_time").nullable();

    table.string("location_name").nullable();
    table.text("location_address").nullable();
    table.text("maps_url").nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("event_schedules");
}