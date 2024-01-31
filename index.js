const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('db_habitask', 'admin', 'passAWSbd', {
  host: 'database-habitask.c1uw4wgcq9bw.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  // Desactivar las marcas de tiempo automáticas
  timestamps: false,
});
exports.handler = async (event, context) => {
  const { nombre, email, contrasena } = event;

  // Permite el uso de async/await
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // Inserta en la tabla Usuarios
    await Usuario.create({ nombre, email, contrasena });
    // Devuelve una respuesta exitosa
    console.log()
    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: 'Usuario registrado exitosamente' }),
    };
  } catch (error) {
    // Maneja los errores y devuelve una respuesta de error
    console.log(error);
    return {
      error,
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};

