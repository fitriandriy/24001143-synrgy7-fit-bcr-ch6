import express from "express";
const router = express.Router();
const { createAdmin, createMember, login, getUserByToken } = require('../controllers/user')
const { auth, is_admin, is_superadmin } = require('../middleware/auth')

router.get('/', auth, is_admin, getUserByToken)
router.post('/admin', auth, is_superadmin, createAdmin)
router.post('/login', login)
router.post('/register', createMember)

export = router