const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Inventariotaller',
  password: 'Elmero*2024',
  port: 5432, // Puerto predeterminado de PostgreSQL
});




// Función para obtener una conexión del pool
const getConnection = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Error al obtener la conexión:', error);
    throw error;
  }
};

// Exportar la función getConnection para usarla en otros archivos
module.exports = { getConnection };