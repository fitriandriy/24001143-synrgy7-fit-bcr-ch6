const { UsersModel } = require('../models/user.model')

// get user by email
const getUserByEmail = async (email:string) => {
  return await UsersModel.query().findOne({email})
}

// get user by email
const getUserById = async (id:string) => {
  return await UsersModel.query().findOne({id})
}

// add user
const createUser = async (id:string, username:string, email:string, password:string, user_type:string) => {
  return await UsersModel.query().insert({ id, username, email, password, user_type })
}

// delete user
const deleteUser = async (id:string) => {
  return await UsersModel.query().where({id}).delete()
}

// update user
const updateUser = async (id:string, data:object) => {
  return await UsersModel.query().where({ id }).update(data)
}

export = {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}