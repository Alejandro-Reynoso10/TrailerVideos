//Configuracion de conexion sequelize
const { Sequelize } = require('sequelize');// se instancia sequelize
const dotenv = require('dotenv');// se traaen las cosntantes de comfiguracion del archivo .env
dotenv.config();

const sequelize = new Sequelize(process.env.DB_SCHEMA, //nombre de la base de datos
                                process.env.DB_USER, // usuario de mysql 
                                process.env.DB_PASSWORD, {//contraseña de mysql
    host: process.env.DB_HOST,//dirección de loopback 
    dialect: 'mysql',
    pool: {
      max: 5, // Máximo de conexiones en el grupo
      min: 0, // Mínimo de conexiones en el grupo
      acquire: 30000, // Tiempo máximo, para liberar conexiones inactivas
      idle: 10000, // Tiempo máximo para cerrar conexiones inactivas
    },
});
//funcion para capturar un error en la conexion
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

module.exports = sequelize;





