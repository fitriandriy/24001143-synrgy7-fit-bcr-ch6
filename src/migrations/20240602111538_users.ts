import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary()
    table.string('username').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('user_type').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
}
