// Importa el módulo 'DataTypes' de Sequelize y la instancia 'sequelize' de la conexión a la base de datos.
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');
//define el modelo de la tabla
const Reparto = sequelize.define('reparto', {
  //define las columnas con los tipos de valores
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idTitulo: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  idActor: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: false 
});

module.exports = Reparto;
