import { CarsModel } from '../models/car.model'

const getAllCars = async () => {
  try {
    const cars = await CarsModel.query()

    return cars
  } catch (error) {
    console.log(error)
    throw(error)
  }
}

const getCarById = async (id:string) => {
  try {
    const car = await CarsModel.query().where('id', id)

    return car
  } catch (error) {
    console.log(error)
    throw(error)
  }
}

const addCar = async (data:object) => {
  try {
    await CarsModel.query().insert(data)
    return true
  } catch (error) {
    return error
  }
}

const editCar = async (id:string, data:object) => {
  try {
    await CarsModel.query().where({ id }).update(data)

    return true
  } catch (error) {
    console.log(error)
    throw(error)
  }
}

const deleteCar = async (id:string) => {
  try {
    await CarsModel.query().where({id}).delete()

    return true
  } catch (error) {
    console.log(error)
    throw(error)
  }
}

export = {
  getAllCars,
  getCarById,
  addCar,
  editCar,
  deleteCar
}