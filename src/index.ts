import express from "express";
import dotenv from "dotenv";
import knex from "knex";
import { Model } from 'objection'
dotenv.config()
const app = express()
const swaggerUI = require("swagger-ui-express")
const YAML = require("yaml");
const fs = require("fs");
const cors = require("cors");
const path = require('path');
const file = fs.readFileSync(path.resolve(__dirname, './docs.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);
const PORT = 8000

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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