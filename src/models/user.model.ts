import { Model, ModelObject } from "objection";
import { CarsModel } from "./car.model";

export class UsersModel extends Model {
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  user_type!: string;

  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.HasManyRelation,
        modelClass: CarsModel,
        join: {
          from: 'users.id',
          to: 'cars.created_by'
        }
      },
      updatedBy: {
        relation: Model.HasManyRelation,
        modelClass: CarsModel,
        join: {
          from: 'users.id',
          to: 'cars.updated_by'
        }
      },
    }
  }
}

export type users = ModelObject<UsersModel>