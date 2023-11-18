/* ************************************************************************** */
/* src/public/js/register/index.js */
/* ************************************************************************** */

document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
      const firstName = document.getElementById('first_name').value;
      const lastName = document.getElementById('last_name').value;
      const email = document.getElementById('email').value;
      const age = document.getElementById('age').value;
      const password = document.getElementById('password').value;

      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        age: age,
        password: password,
      };

      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        swal('Usuario registrado', 'Loguéate con tu Email y Password', 'success').then(function () {
          window.location.href = '/';
        });
      } else {
        try {
          const data = await response.json();

          if (data.error && data.error === 'Ya existe un usuario con el mismo correo electrónico') {
            swal('Error', 'Ya existe un usuario con el mismo correo electrónico', 'error');
          } else {
            swal('Error', 'No se pudo registrar el usuario', 'error');
          }
        } catch (error) {
          console.error('Error parsing error response:', error);
        }
      }
    } catch (error) {
      console.error('Error during user registration:', error);
    }
  });
});
