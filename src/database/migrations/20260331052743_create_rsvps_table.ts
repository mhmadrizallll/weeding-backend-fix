import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("rsvps", (table) => {
    table.increments("id").primary();

    table
      .integer("invitation_id")
      .unsigned()
      .references("id")
      .inTable("invitations")
      .onDelete("CASCADE");

    table.string("guest_name").notNullable();
    table.string("attendance_status").notNullable(); // hadir / tidak hadir / mungkin
    table.text("message").nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("rsvps");
}