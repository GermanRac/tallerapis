document.getElementById('modificarProductoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const productId = document.getElementById('productId').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
  
    try {
      const response = await fetch(`/api/inventario/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cantidad, precio })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Producto actualizado:', data);
        // Aquí puedes agregar código para mostrar un mensaje de éxito al usuario
      } else {
        console.error('Error al actualizar el producto');
        // Aquí puedes agregar código para mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Aquí puedes agregar código para mostrar un mensaje de error al usuario
    }
  });