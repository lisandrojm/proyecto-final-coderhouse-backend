/* ************************************************************************** */
/* /src/public/js/userDashboard/index.js - .js de /src/views/profile.handlebars */
/* ************************************************************************** */

const socket = io();

const addOrUpdateProductRow = (data) => {
  try {
    const documents = data.documents;
    const productRows = documents.map(
      (document) => `
    <tr id='${document.id}'>
      <td>${document.id}</td>
      <td>${document.name}</td>
      <td>${document.reference}</td>
      <td>${document.fieldname}</td>
      <td>
        <button class='btn btn-danger btn-sm' onclick="deleteDocument('${document.id}')">Eliminar</button>
      </td>
    </tr>
  `
    );
    const productRowsHTML = productRows.join('');
    const productTable = document.getElementById('product-table');
    const existingRow = document.getElementById(documents[0]._id);

    if (existingRow) {
      existingRow.innerHTML = productRowsHTML;
    } else {
      productTable.insertAdjacentHTML('beforeend', productRowsHTML);
    }
  } catch (error) {
    console.error('Error in addOrUpdateProductRow:', error);
  }
};

const deleteDocumentRow = (documentId) => {
  try {
    const documentRow = document.getElementById(documentId);
    if (documentRow) {
      documentRow.remove();
    }
  } catch (error) {
    console.error('Error in deleteDocumentRow:', error);
  }
};

const deleteProductRow = (productId) => {
  try {
    const productRow = document.getElementById(productId);
    if (productRow) {
      productRow.remove();
    }
  } catch (error) {
    console.error('Error in deleteProductRow:', error);
  }
};

const addOrUpdateStatusRow = (data) => {
  try {
    const documents_status = data.user.documents_status;
    const premium_documents_status = data.user.premium_documents_status;
    const statusTable = document.getElementById('status-table');
    const statusRows = [
      `<thead>
        <tr>
          <th>Document</th>
          <th>Status</th>
        </tr>
      </thead>`,
      `<tr>
        <td>Any document</td>
        <td>${documents_status}</td>
      </tr>`,
      `<tr>
        <td>Premium documents</td>
        <td>${premium_documents_status}</td>
      </tr>`,
    ];
    const statusRowsHTML = statusRows.join('');
    statusTable.innerHTML = statusRowsHTML;
  } catch (error) {
    console.error('Error in addOrUpdateStatusRow:', error);
  }
};

const userIdDiv = document.getElementById('userId');
const userId = userIdDiv.getAttribute('data-user-id');

const deleteDocument = async (id) => {
  try {
    const response = await fetch(`/api/users/${userId}/documents/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      socket.emit('deleteDocument', id);
    } else {
      console.error('Error al eliminar el producto');
    }
  } catch (error) {
    console.error('Error in deleteDocument:', error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      socket.emit('deleteProduct', id);
      console.log('producto eliminado');
    } else {
      console.error('Error al eliminar el producto');
    }
  } catch (error) {
    console.error('Error in deleteProduct:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('documentFormIdentification');
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(productForm);

      for (const entry of formData.entries()) {
        const [name, value] = entry;
        console.log(`name: ${name}, value: ${value}`);
      }

      const response = await fetch(`/api/users/${userId}/documents/identificacion`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Documento agregado con éxito');
        productForm.reset();
      } else {
        const error = await response.json();
        console.error('Error al agregar el documento:', error);
      }
    } catch (error) {
      console.error('Error in documentFormIdentification submit:', error);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('documentFormProofOfAddress');
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(productForm);

      for (const entry of formData.entries()) {
        const [name, value] = entry;
        console.log(`name: ${name}, value: ${value}`);
      }

      const response = await fetch(`/api/users/${userId}/documents/comprobanteDeDomicilio`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Documento agregado con éxito');
        productForm.reset();
      } else {
        const error = await response.json();
        console.error('Error al agregar el documento:', error);
      }
    } catch (error) {
      console.error('Error in documentFormProofOfAddress submit:', error);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('documentFormBankStatement');
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(productForm);

      for (const entry of formData.entries()) {
        const [name, value] = entry;
        console.log(`name: ${name}, value: ${value}`);
      }

      const response = await fetch(`/api/users/${userId}/documents/comprobanteDeEstadoDeCuenta`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Documento agregado con éxito');
        productForm.reset();
      } else {
        const error = await response.json();
        console.error('Error al agregar el documento:', error);
      }
    } catch (error) {
      console.error('Error in documentFormBankStatement submit:', error);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('document');
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(productForm);

      for (const entry of formData.entries()) {
        const [name, value] = entry;
        console.log(`name: ${name}, value: ${value}`);
      }

      const response = await fetch(`/api/users/${userId}/documents`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Documento agregado con éxito');
        productForm.reset();
      } else {
        const error = await response.json();
        console.error('Error al agregar el documento:', error);
      }
    } catch (error) {
      console.error('Error in document submit:', error);
    }
  });
});

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const roleSelectForm = document.getElementById('roleSelect');
    roleSelectForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const selectedRole = document.querySelector('#roleSelect select').value;
      const userIdElement = document.getElementById('userId');
      const userId = userIdElement.getAttribute('data-user-id');
      try {
        const response = await fetch(`/api/users/premium/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: selectedRole }),
        });
        if (response.status === 200) {
          try {
            await fetch('/api/session/auth/logout');
            swal('¡La solicitud de cambio de Role se ha completado con éxito!', 'Vuelve a loguearte con tu nuevo Role', 'success').then(function () {
              window.location.href = '/';
            });
          } catch (logoutError) {
            console.error('Error en la solicitud de logout:', logoutError);
            swal('Error', 'La solicitud de cambio de Role se realizó con éxito pero hubo un error en el logout ', 'error');
          }
        } else {
          swal('Error', 'Error al intentar cambiar de Role. No has terminado de procesar tu documentación requerida para cambiar de Role User a Premium', 'error');
        }
      } catch (error) {
        console.error('Error en la solicitud PUT:', error);
      }
    });
  } catch (error) {
    console.error('Error in roleSelectForm submit:', error);
  }
});

const select = document.getElementById('roleSelect');
const submitButton = document.getElementById('submitButton');

select.addEventListener('change', function () {
  if (select.value !== 'Role') {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'true');
  }
});

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
        swal('¡Producto Agregado con éxito!', '', 'success').then(function () {
          productForm.reset();
          window.location.reload();
        });
      } else {
        const error = await response.json();
        console.error('Error al agregar el producto:', error);
      }
    } catch (error) {
      console.error('Error in productForm submit:', error);
    }
  });
});

socket.on('newDocument', addOrUpdateProductRow);
socket.on('deleteDocument', deleteDocumentRow);
socket.on('deleteProduct', deleteProductRow);
socket.on('newStatus', addOrUpdateStatusRow);
