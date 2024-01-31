const { DataTypes } = require('sequelize');

const Tarea = sequelize.define('Tarea', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_completado: {
    type: DataTypes.DATE,
  },
  // Desactivar las marcas de tiempo automáticas
  timestamps: false,
});

module.exports = Tarea;
