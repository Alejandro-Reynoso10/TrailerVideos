// Importa el módulo 'DataTypes' de Sequelize y la instancia 'sequelize' de la conexión a la base de datos.
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');
//define el modelo de la tabla
const Categoria = sequelize.define('categoria', {
  //define las columnas con los tipos de valores
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoria: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
}, {
  timestamps: false, 
});

module.exports = Categoria;
