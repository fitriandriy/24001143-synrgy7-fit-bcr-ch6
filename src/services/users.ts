const { getUserById, getUserByEmail, createUser, updateUser, deleteUser } = require('../repositories/users')
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const createAdminServices = async (username:string, email:string, password:string ) => {
  try {
    const user = await getUserByEmail(email)
    const id = uuid()
    const hashPassword = await bcrypt.hash(password, 10);
    const user_type = "superadmin"
    if(!user) {
      await createUser(id, username, email, password=hashPassword, user_type)
      return true
    } else {
      return 'email already used.'
    }
  } catch (error) {
    return error
  }
}

const createMemberServices = async (username:string, email:string, password:string) => {
  try {
    const user = await getUserByEmail(email)
    const id = uuid()
    const hashPassword = await bcrypt.hash(password, 10)
    const user_type = "member"
    if(!user) {
      await createUser(id, username, email, password=hashPassword, user_type)
      return true
    } else {
      return 'email already used.'
    }
  } catch (error) {
    return error
  }
}

const loginServices = async (email:string, password:string) => {
  try {
    const user = await getUserByEmail(email)

    if(!user) {
      return false
    } else {
      const checkPassword = await bcrypt.compare(password, user.password)

      if (!checkPassword) {
        return false
      } else {
        const payload = {
          id: user.id,
          role: user.user_type
        }

        const token = await jwt.sign(payload, 'secret', {
          expiresIn: "30d"
        })

        return {token: token}
      }
    }
  } catch (error) {
    return error
  }
}

const getUserByTokenServices = async (id:string) => {
  try {
    const user = await getUserById(id)
    if(!user) {
      return false
    } else {
      return user
    }
  } catch (error) {
    return error
  }
}

export = {
  createAdminServices,
  createMemberServices,
  loginServices,
  getUserByTokenServices
}