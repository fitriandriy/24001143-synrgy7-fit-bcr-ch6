import { Model, ModelObject } from "objection";
import { CarsModel } from "./car.model";
import { OrdersModel } from "./order.model";

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
      user_email: {
        relation: Model.HasManyRelation,
        modelClass: OrdersModel,
        join: {
          from: 'users.email',
          to: 'orders.user_email'
        }
      },
    }
  }
}

export type users = ModelObject<UsersModel>