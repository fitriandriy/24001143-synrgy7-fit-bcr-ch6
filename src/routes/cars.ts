import express from "express";
const router = express.Router();
const { getAll, addCar, editCar, deleteCar } = require('../controllers/cars')
const { auth, is_admin } = require('../middleware/auth')
const cdnUpload = require('../middleware/cdnUploadHandler')
// router.get('/', getAll)
// router.post('/', auth, is_admin, addCar)
// router.put('/:id', auth, is_admin, editCar)
// router.delete('/:id', auth, is_admin, deleteCar)

router.get('/', getAll)
router.post('/', auth, is_admin, cdnUpload.single('image'), addCar)
router.put('/:id', auth, is_admin, cdnUpload.single('image'), editCar)
router.delete('/:id', auth, is_admin, deleteCar)

export = router