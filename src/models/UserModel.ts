import { DataTypes, Model, Sequelize } from 'sequelize';

interface UserAttributes{
    id: number;
    name: string;
    email: string;
}

export class User extends Model implements UserAttributes{
    declare id: number;
    declare name: string;
    declare email: string;
}


export function initUserModel(sequelize: Sequelize): typeof User {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
    );

    console.log("Modelo de usuario creado");
    return User;
}
