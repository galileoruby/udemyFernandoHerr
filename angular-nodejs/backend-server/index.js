require('dotenv').config();
const express = require('express');
const cors= require('cors');
const {dbConnection} = require('./database/config')


const routerUsuarios= require('./routes/Usuarios')
const auth= require('./routes/auth')

//crear servidor
const app = express();


//Configurar CORS
app.use(cors());


//lectura y parseo del body
app.use(express.json());

dbConnection();

//rutas
app.use('/api/usuarios',routerUsuarios);
app.use('/api/login',auth);

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo')
});