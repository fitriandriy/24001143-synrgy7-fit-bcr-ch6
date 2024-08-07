import { Model, ModelObject } from "objection";
import { UsersModel } from "./user.model";
import { OrdersModel } from "./order.model";

export class CarsModel extends Model {
  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  availableAt!: string;
  transmission!: string;
  available!: boolean;
  type!: string;
  year!: number;
  created_by!: string;
  updated_by!: string;

  static get tableName() {
    return "cars";
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'cars.created_by',
          to: 'users.id'
        }
      },
      updatedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'cars.updated_by',
          to: 'users.id'
        }
      },
      car_id: {
        relation: Model.HasManyRelation,
        modelClass: OrdersModel,
        join: {
          from: 'cars.id',
          to: 'orders.car_id'
        }
      },
    }
  }
}

export type cars = ModelObject<CarsModel>