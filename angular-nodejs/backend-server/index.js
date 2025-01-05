require('dotenv').config();
const express = require('express');
const cors= require('cors');
const {dbConnection} = require('./database/config')

//crear servidor
const app = express();


//Configurar CORS
app.use(cors())

dbConnection();

//rutas
app.get('/', (req,res)=>{

    res.json({
        ok:true,
        msg:'Holamundo'
    })

});

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo')
});