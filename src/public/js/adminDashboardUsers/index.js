/* ************************************************************************** */
/* src/public/js/adminDashboardUsers/index.js  */
/* ************************************************************************** */

const socket = io();

/* const addOrUpdateProductRow = (product) => {
  try {
    console.log('product');
    const productRow = `
      <tr id="${product._id}">
        <td>${product._id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.code}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td>${product.thumbnails}</td>
        <td>${product.owner}</td>
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
}; */

const deleteUserRow = (userId) => {
  try {
    const userRow = document.getElementById(userId);
    if (userRow) {
      userRow.remove();
    }
  } catch (error) {
    console.error('Error al eliminar la fila del usuario:', error);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  try {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (event) {
      try {
        event.preventDefault();

        const role = document.getElementById('role').value;
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const password = document.getElementById('password').value;

        const payload = {
          role: role,
          first_name: firstName,
          last_name: lastName,
          email: email,
          age: age,
          password: password,
        };

        fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(function (response) {
            if (response.ok) {
              swal('Usuario registrado', `User Email: ${email}`, 'success').then(function () {
                registerForm.reset();
                window.location.reload();
              });
            } else {
              response.json().then(function (data) {
                if (data.error && data.error === 'Ya existe un usuario con el mismo correo electrónico') {
                  swal('Error', 'Ya existe un usuario con el mismo correo electrónico', 'error');
                } else {
                  swal('Error', 'No se pudo registrar el usuario', 'error');
                }
              });
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (error) {
        console.error('Error al procesar el formulario de registro:', error);
      }
    });
  } catch (error) {
    console.error('Error al cargar el contenido:', error);
  }
});

const deleteUser = (id) => {
  try {
    fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          socket.emit('deleteUser', id);
        } else {
          console.error('Error al eliminar el usuario');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
  } catch (error) {
    console.error('Error al intentar eliminar el usuario:', error);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  try {
    const updateForm = document.getElementById('userUpdate');

    updateForm.addEventListener('submit', function (event) {
      try {
        event.preventDefault();

        const uid = document.getElementById('_idUpdate').value;
        const newRole = document.getElementById('roleUpdate').value;

        const userData = {
          role: newRole,
        };

        fetch(`/api/users/${uid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Actualización exitosa');
              swal('Role de usuario actualizado', `ID: ${uid}\nRole: ${newRole}`, 'success').then(function () {
                window.location.reload();
              });
            } else {
              swal('EL ID no existe en la base de Datos.', `User ID: ${uid}`, 'error').then(function () {
                window.location.reload();
              });
              console.error('Error en la solicitud:', response.status);
            }
          })
          .catch((error) => {
            console.error('Error en la solicitud:', error);
          });
      } catch (error) {
        console.error('Error al procesar el formulario de actualización:', error);
      }
    });
  } catch (error) {
    console.error('Error al cargar el contenido:', error);
  }
});

/* socket.on('newProduct', addOrUpdateProductRow);
socket.on('updateProduct', addOrUpdateProductRow); */
socket.on('deleteUser', deleteUserRow);
socket.on('totalUsersUpdate', (totalUsers) => {
  document.getElementById('totalUsersValue').innerText = totalUsers;
});

const deleteInactiveUsers = document.getElementById('deleteInactiveUsers');
deleteInactiveUsers.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/users/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roles: ['ADMIN'],
      }),
    });
    if (response.ok) {
      swal('¡Usuarios eliminados exitosamente!', '', 'success').then(function () {
        window.location.reload();
      });
    } else {
      swal('No se han eliminado usuarios inactivos', '', 'info');
      console.error('No se encontraron usuarios inactivos');
    }
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
  }
});
