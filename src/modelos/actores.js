// Importa el módulo 'DataTypes' de Sequelize y la instancia 'sequelize' de la conexión a la base de datos.

const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');
//define el modelo de la tabla actores
const Actores = sequelize.define('actores', {
  //define las columnas con los tipos de valores

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  actor: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
}, {
  timestamps: false, 
});
//aqui se se declara las realciones entre las tablas y luego se exporta 
module.exports = Actores;