import express from "express";
const { sequelize, User } = require("./config/connectionDB");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`--> Servidor desplegado y corriendo en: http://localhost:${port}`)
})

// Realizar la conexión a la base de datos
try {
    (async ()=>{
        await sequelize.authenticate();
        console.log('--> Connection has been established successfully.');
    })()

} catch (error) {
    console.error('** ERROR AL CONCECTAR A LA BASE DE DATOS: ', error);
}
