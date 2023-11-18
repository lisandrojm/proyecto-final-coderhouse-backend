/* ************************************************************************** */
/* src/public/js/recovery/index.js  */
/* ************************************************************************** */

document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('recoveryForm');

  registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const payload = {
        email: email,
        password: password,
      };

      const response = await fetch('/api/users/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        swal('Contraseña Recuperada', 'Loguéate con tu Email y tu nuevo Password', 'success').then(function () {
          window.location.href = '/';
        });
      } else {
        try {
          const errorData = await response.json();
          swal('El usuario no existe', 'No se pudo recuperar la contraseña', 'error');
        } catch (error) {
          console.error('Error parsing error response:', error);
        }
      }
    } catch (error) {
      console.error('Error during password recovery:', error);
    }
  });
});
