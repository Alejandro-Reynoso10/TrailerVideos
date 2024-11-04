// Importa el módulo 'DataTypes' de Sequelize y la instancia 'sequelize' de la conexión a la base de datos.
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');
//define el modelo de la tabla
const Genero = sequelize.define('genero', {
  //define las columnas con los tipos de valores
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  genero: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
}, {
  timestamps: false,
});

module.exports = Genero;

