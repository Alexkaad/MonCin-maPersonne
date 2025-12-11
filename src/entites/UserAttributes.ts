import {Model, Optional} from "sequelize";

export interface UserAttributes {

    id: number;
    name: string;
    firstName: string;
    createdAt?: Date;
    updatedAt?: Date;
    email : string;
    password : string;
}



interface UserCreationAttributes extends
    Optional<UserAttributes, 'id'|'createdAt'|'updatedAt'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {checkPassword: (password: string) => Promise<boolean>}