import { Model, ModelObject } from "objection";
import { UsersModel } from "./user.model";
import { CarsModel } from "./car.model";

export class OrdersModel extends Model {
  id!: string;
  user_email!: string;
  car_id!: string;
  start_rent!: string;
  finish_rent!: string;
  price!: number;
  status!: string;

  static get tableName() {
    return "orders";
  }

  static get relationMappings() {
    return {
      user_email: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'orders.user_email',
          to: 'users.id'
        }
      },
      car_id: {
        relation: Model.BelongsToOneRelation,
        modelClass: CarsModel,
        join: {
          from: 'orders.car_id',
          to: 'cars.id'
        }
      },
    }
  }
}

export type orders = ModelObject<OrdersModel>