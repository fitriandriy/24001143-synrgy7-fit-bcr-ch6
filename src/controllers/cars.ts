import { Request, Response } from 'express'
const { getCarsService, addCarService, editCarService, deleteCarService } = require('../services/cars')

const getAll = async (req: Request, res: Response) => {
  try {
    const cars = await getCarsService()

    res.status(200).json({
      status: true,
      message: "success",
      data: cars
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "server error"
    })
  }
}

const addCar = async (req: Request, res: Response) => {
  const { plate, manufacture, model, image, rentPerDay, capacity, description, availableAt, transmission, available, type, year, created_by, updated_by } = req.body

  const data = {
    plate, manufacture, model, image, rentPerDay, capacity, description, availableAt, transmission, available, type, year, created_by, updated_by
  }

  try {
    await addCarService(data)
    res.status(200).json({
      status: true,
      message: "success",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: "server error"
    })
  }
}

const editCar = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = req.body
  try {
    const updated = await editCarService(id, data)

    if (updated === true) {
      res.status(200).json({
        status: true,
        message: "success",
      })
    } else {
      res.status(400).json({
        status: true,
        message: "bad request",
        error: updated
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: "server error"
    })
  }
}

const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await deleteCarService(id)

    if (result === 1) {
      return res.status(200).json({
        status: true,
        message: "success"
      })
    } else {
      return res.status(404).json({
        status: false,
        message: `can't find car with id ${id}!`
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: "server error"
    })
  }
}

export {
  getAll,
  addCar,
  editCar,
  deleteCar
}