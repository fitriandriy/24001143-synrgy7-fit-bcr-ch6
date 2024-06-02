import express from "express";
const router = express.Router();
const { getAll, addCar, editCar, deleteCar } = require('../controllers/cars')
const { auth, is_admin } = require('../middleware/auth')

router.get('/', getAll)
router.post('/', auth, is_admin, addCar)
router.put('/:id', auth, is_admin, editCar)
router.delete('/:id', auth, is_admin, deleteCar)

export = router