const express = require('express');
const app = express();
const { getConnection } = require('./database');

app.use(express.json());

// Ruta para obtener todos los productos del inventario
app.get('/api/inventario', async (req, res) => {
  try {
    const client = await getConnection();
    const resultado = await client.query('SELECT * FROM inventario');
    client.release();
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el inventario' });
  }
});

// Ruta para agregar un nuevo producto al inventario
app.post('/api/inventario', async (req, res) => {
    try {
      const client = await getConnection();
      const { nombre, cantidad, precio } = req.body;
      const resultado = await client.query('INSERT INTO inventario (nombre, cantidad, precio) VALUES ($1, $2, $3) RETURNING *', [nombre, cantidad, precio]);
      client.release();
      res.json(resultado.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el producto' });
    }
  });
  
  // Ruta para actualizar la cantidad de un producto existente
  app.put('/api/inventario/:id', async (req, res) => {
    try {
      const client = await getConnection();
      const { cantidad } = req.body;
      const resultado = await client.query('UPDATE inventario SET cantidad = $1 WHERE id = $2 RETURNING *', [cantidad, req.params.id]);
      client.release();
      res.json(resultado.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });
  
  // Ruta para eliminar un producto del inventario
  app.delete('/api/inventario/:id', async (req, res) => {
    try {
      const client = await getConnection();
      const resultado = await client.query('DELETE FROM inventario WHERE id = $1 RETURNING *', [req.params.id]);
      client.release();
      res.json(resultado.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });




    // Ruta para actualizar la cantidad y el precio de un producto existente
app.put('/api/inventario/update:id', async (req, res) => {
  try {
    const client = await getConnection();
    const { cantidad, precio } = req.body;
    const resultado = await client.query('UPDATE inventario SET cantidad = $1, precio = $2 WHERE id = $3 RETURNING *', [cantidad, precio, req.params.id]);
    client.release();
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});