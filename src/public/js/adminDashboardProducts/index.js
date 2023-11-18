/* ************************************************************************* */
/* src/public/js/adminDashboardProducts/index.js */
/* ************************************************************************* */

const socket = io();

const addOrUpdateProductRow = (product) => {
  try {
    const productRow = `
      <tr id="${product._id}">
        <td>${product._id}</td>
        <td>${product.title}</td>
        <td>${product.code}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td>${product.thumbnails}</td>
        <td>${product.owner.role}</td>
        <td>${product.owner.id}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')">Eliminar</button>
        </td>
      </tr>
    `;
    const productTable = document.getElementById('product-table');
    const existingRow = document.getElementById(product._id);
    if (existingRow) {
      existingRow.innerHTML = productRow;
    } else {
      productTable.insertAdjacentHTML('beforeend', productRow);
    }
  } catch (error) {
    console.error('Error al agregar o actualizar la fila del producto:', error);
  }
};

const deleteProductRow = (productId) => {
  try {
    const productRow = document.getElementById(productId);
    if (productRow) {
      productRow.remove();
    }
  } catch (error) {
    console.error('Error al eliminar la fila del producto:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('productForm');
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(productForm);
      for (const entry of formData.entries()) {
        const [name, value] = entry;
        console.log(`Campo: ${name}, Valor: ${value}`);
      }
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Producto agregado con éxito');
        productForm.reset();
      } else {
        const error = await response.json();
        console.error('Error al agregar el producto:', error);
      }
    } catch (error) {
      console.error('Error al procesar el envío del formulario:', error);
    }
  });
});

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      socket.emit('deleteProduct', id);
    } else {
      console.error('Error al eliminar el producto');
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

const productUpdateForm = document.getElementById('productUpdate');
productUpdateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData(productUpdateForm);
    const productId = formData.get('_id');
    console.log('Product ID', productId);
    if (!productId) {
      console.error('No se proporcionó un ID de producto válido');
      return;
    }
    formData.delete('_id');
    const fileData = new FormData();
    for (const [name, value] of formData.entries()) {
      if (value !== '') {
        if (name === 'image') {
          const files = productUpdateForm.querySelector('input[name="image"]').files;
          for (const file of files) {
            fileData.append('image', file);
          }
        } else {
          fileData.append(name, value);
        }
      }
    }
    const response = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      body: fileData,
    });

    if (response.ok) {
      console.log('Producto actualizado con éxito');
      productUpdateForm.reset();
    } else {
      const error = await response.json();
      console.error('Error al actualizar el producto:', error);
    }
  } catch (error) {
    console.error('Error al procesar la actualización del producto:', error);
  }
});

const mockingButton = document.getElementById('mockingButton');
mockingButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/mockingproducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roles: ['ADMIN'],
      }),
    });
    if (response.ok) {
      swal('¡Productos creados exitosamente con Faker!', '', 'success').then(function () {
        window.location.reload();
      });
    } else {
      console.error('Error al realizar la solicitud POST');
    }
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
  }
});

socket.on('newProduct', addOrUpdateProductRow);
socket.on('updateProduct', addOrUpdateProductRow);
socket.on('deleteProduct', deleteProductRow);
socket.on('totalProductsUpdate', (totalProducts) => {
  document.getElementById('totalProductsValue').innerText = totalProducts;
});
