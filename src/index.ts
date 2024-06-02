import express from "express";
import dotenv from "dotenv";
import knex from "knex";
import { Model } from 'objection'
dotenv.config()
const app = express()
const PORT = 8000

app.use(express.json());
const Router = require("./routes")

app.use(Router)
const knexInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "postgres",
    port: 5432,
    host: "127.0.0.1",
    database: "challenge_6",
  }
})

Model.knex(knexInstance)

app.listen(PORT, () => {console.log(`Server running in port ${PORT}`)})