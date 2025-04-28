import { Sequelize } from "sequelize";
import SQLite from 'sqlite3';
import { initUserModel, User} from "../models/UserModel";

// Generar conexión a la base de datos
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // BASE DE DATOS EN CARPETA RAÍZ
    sync: { force: true },
    dialectOptions: {
        // Your sqlite3 options here
        // for instance, this is how you can configure the database opening mode:
        mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
    },
});

// Inicializar modelos en base de datos (crear tablas)
const initDB = () => {
    initUserModel(sequelize);
};

initDB();

export { sequelize, User };
