const { Sequelize } = require('sequelize');
const { Tarea, Usuario } = require('./models');

// Relación entre Usuario y Tarea
Usuario.hasMany(Tarea, { as: 'TareasCreadas', foreignKey: 'usuario_creador_id' });
Usuario.hasMany(Tarea, { as: 'TareasAsignadas', foreignKey: 'usuario_asignado_id' });

Tarea.belongsTo(Usuario, { as: 'Creador', foreignKey: 'usuario_creador_id' });
Tarea.belongsTo(Usuario, { as: 'Asignado', foreignKey: 'usuario_asignado_id' });

new Sequelize('db_habitask', 'admin', 'passAWSbd', {
  host: 'database-habitask.c1uw4wgcq9bw.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // Obtén los datos necesarios de event.body o de donde corresponda
    const { titulo, usuario_creador_id, usuario_asignado_id } = JSON.parse(event.body);

    // Crea la tarea
    const tareaCreada = await Tarea.create({
      titulo,
      usuario_creador_id,
      usuario_asignado_id,
    });

    // Devuelve una respuesta exitosa
    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: 'Tarea creada exitosamente', tarea: tareaCreada }),
    };
  } catch (error) {
    // Maneja los errores y devuelve una respuesta de error
    console.error('Error al crear la tarea:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};

