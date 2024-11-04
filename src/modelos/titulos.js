// Importa el módulo 'DataTypes' de Sequelize y la instancia 'sequelize' de la conexión a la base de datos.
const { DataTypes, Op } = require('sequelize');
const sequelize = require('../conexion/connection');
const GeneroTitulo = require('./generotitulo');
//define el modelo de la tabla
const Titulos = sequelize.define('titulos', {
  //define las columnas con los tipos de valores
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  poster: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
  titulo: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
  categoria: {
    type: DataTypes.STRING(255), // Cambiado a STRING para buscar género
    defaultValue: '', // Deja el valor por defecto como cadena vacía
  },
  resumen: {
    type: DataTypes.STRING(948),
    defaultValue: '',
  },
  temporadas: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  trailer: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
}, {
  timestamps: false,
});
//aqui se se declara las realciones entre las tablas y luego se exporta 

Titulos.hasMany(GeneroTitulo, { foreignKey: 'idTitulo' });

module.exports = Titulos;