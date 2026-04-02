import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("rsvps", (table) => {
    table.increments("id").primary();
    table.integer("invitation_id").unsigned().notNullable();
    table.string("guest_name").notNullable();
    table.enum("attendance_status", ["hadir", "tidak_hadir", "masih_ragu"]).notNullable();
    table.text("message").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .foreign("invitation_id")
      .references("id")
      .inTable("invitations")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("rsvps");
}