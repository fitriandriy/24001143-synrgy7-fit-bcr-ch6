const { createAdminServices, createMemberServices, loginServices, getUserByTokenServices } = require('../services/users')
import { Request, Response } from 'express'
const jwt = require('jsonwebtoken')

const createAdmin = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  try {
    const user = await createAdminServices(username, email, password)

    if (user === true) {
      res.status(201).json({
        status: true,
        message: 'user created'
      })
    } else {
      res.status(400).json({
        status: false,
        message: user
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error
    })
  }
}

const createMember = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  try {
    const user = await createMemberServices(username, email, password)

    if (user === true) {
      res.status(201).json({
        status: true,
        message: 'user created'
      })
    } else {
      res.status(400).json({
        status: false,
        message: user
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error
    })
  }
}

const login = async (req: Request, res: Response) => {
  const {email, password} = req.body

  try {
    const result = await loginServices(email, password)

    if (result !== false) {
      res.status(200).json({
        status: true,
        message: 'success',
        token: result.token
      })
    } else {
      res.status(400).json({
        status: false,
        message: 'email or password incorrect'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error
    })
  }
}

const getUserByToken = async (req:Request, res:Response) => {
  const { token } = req.body
  const data = await jwt.verify(token, 'secret');
  try {
    const user = await getUserByTokenServices(data.id)
    if (user !== false) {
      res.status(200).json({
        status: true,
        message: 'success',
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          user_type: user.user_type
        }
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error
    })
  }
}

export = {
  createAdmin,
  createMember,
  login,
  getUserByToken
}