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
const { PG_USERNAME, PG_PASSWORD, PG_PORT, PG_HOST, PG_DATABASE } = process.env;

const Router = require("./routes")

app.use(Router)
const knexInstance = knex({
  client: "pg",
  connection: {
    user: 'postgres.gxudmhvxiqrvfsxglirz',
    password: 'KyTqYYRzXcXPNVVi',
    port: 6543,
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    database: 'postgres',
  }
})

Model.knex(knexInstance)

app.listen(8000, () => {console.log(`Server running in port ${PORT}`)})