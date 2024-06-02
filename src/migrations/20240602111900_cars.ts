import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table) => {
    table.string('id').primary()
    table.string('plate').notNullable()
    table.string('manufacture').notNullable()
    table.string('model').notNullable()
    table.string('image').notNullable()
    table.integer('rentPerDay').notNullable()
    table.integer('capacity').notNullable()
    table.string('description').notNullable()
    table.string('availableAt').notNullable()
    table.string('transmission').notNullable()
    table.boolean('available').notNullable()
    table.string('type').notNullable()
    table.integer('year').notNullable()
    table.string('created_by').notNullable()
    table.string('updated_by').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
}

