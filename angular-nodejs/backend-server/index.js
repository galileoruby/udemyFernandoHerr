require('dotenv').config();
const express = require('express');
const cors= require('cors');
const {dbConnection} = require('./database/config');

const routerUsuarios= require('./routes/Usuarios');
const routerHospitales= require('./routes/Hospitales');
const routerMedicos= require('./routes/Medicos');
const auth= require('./routes/auth');

const routerBusquedas = require('./routes/Busquedas');
const routerUpload = require('./routes/upload');

//crear servidor
const app = express();

//Configurar CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json());

dbConnection();

///directorio publico
app.use(express.static('public'));

//rutas
app.use('/api/usuarios',routerUsuarios);
app.use('/api/hospitales',routerHospitales);
app.use('/api/hospitales',routerHospitales);
app.use('/api/medicos',routerMedicos);
app.use('/api/login',auth);
app.use('/api/todo', routerBusquedas);

app.use('/api/upload',routerUpload)

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo')
});