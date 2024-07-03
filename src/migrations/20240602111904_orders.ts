import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', (table) => {
    table.string('id').primary()
    table.string('user_email').notNullable()
    table.string('car_id').notNullable()
    table.string('start_rent').notNullable()
    table.string('finish_rent').notNullable()
    table.integer('price').notNullable()
    table.string('status').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
}

