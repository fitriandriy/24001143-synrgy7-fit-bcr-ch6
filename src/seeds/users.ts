import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: "f4905519-fa17-4d11-b0da-922e9df2fb81", username: "sabrina", email: "sabrina@gmail.com", password: "$2b$10$.EkwMg64zlgc.6ndHmVW9e.r4Fe3pWtWemolKgpj4rhisfewtBm0O", user_type: "superadmin" },
    ]);
};
