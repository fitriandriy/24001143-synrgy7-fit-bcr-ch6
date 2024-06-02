import express from "express"
import user from "./user";
import car from "./cars";
const route = express.Router();

route.use('/users', user)
route.use('/cars', car)

route.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: "success"
  })
})

export = route