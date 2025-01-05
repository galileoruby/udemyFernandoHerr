require('dotenv').config();
const mongoose = require('mongoose');


const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.CONNECTION_MONGO);
        console.log('conectado');
    }catch(error){
        console.log('Conexion en bd:', error);
        throw new Error("Error al conectar bd");
    }
}

module.exports={
    dbConnection
}