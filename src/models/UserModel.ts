import { DataTypes, Model, Sequelize } from 'sequelize';

export class User extends Model {
    private id!: number;
    private name!: string;
    private email!: string;
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
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
    );

    return User;
}
