import { CarsModel } from '../models/car.model'
const { getAllCars, getCarById, addCar, editCar, deleteCar } = require('../repositories/cars')
const {v4: uuid} = require('uuid')
const getCarsService = async () => {  
  try {
    const cars = await getAllCars()
    return cars
  } catch (error) {
    return error    
  }
}

const addCarService = async (data:object) => {
  const id = uuid()
  const newData = {
    id,
    ...data
  }
  try {
    const cars = await addCar(newData)
    return cars
  } catch (error) {
    return error
  }
}

const editCarService = async (id:string, data:object) => {
  try {
    const updated = await editCar(id, data)
    return updated
  } catch (error) {
    return error
  }
}

const deleteCarService = async (id:string) => {
  try {
    const car = await getCarById(id)

    if (car.length < 1) {
      return 'car not found'
    }
    
    const result = await CarsModel.query().where({id}).delete()

    return result
  } catch (error) {
    return error
  }
}

export {
  getCarsService,
  addCarService,
  editCarService,
  deleteCarService
}