import express from "express";
import {Sequelize} from "sequelize";
import {Json} from "sequelize/lib/utils";
const { sequelize, User } = require("./config/connectionDB");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.route('/user')
    // Recuperar información del usuario
    .get(async (req, res): Promise<void> => {

        const queryResponse: typeof User = await User.findOne({
            where: {name: req.query.name}
        })

        if(!queryResponse) console.log(`Usuario ${req.query.name} no encontrado`);
        else console.log(`Usuario ${req.query.name} encontrado`);

        res.send(queryResponse);
}).post(async (req, res) => {
    const userData  = req.body;

    let user: typeof User;
    let isCreated: boolean;
    [user, isCreated] =  await User.findOrCreate({
        where: {name: userData.name},
        defaults: userData
    });

    isCreated ?
        console.log("El usuario ha sido creado") :
        console.log("El usuario ya existe y no ha sido creado");
    user.isCreated = isCreated;

    res.send({
        user,
        isCreated
    })
})



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
        await sequelize.sync();
        console.log('--> Connection a la base de datos EXITOSA!')
    })()

} catch (error) {
    console.error('** ERROR AL CONECTAR A LA BASE DE DATOS: ', error);
}
