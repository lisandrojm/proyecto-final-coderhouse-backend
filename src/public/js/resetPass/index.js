/* ************************************************************************** */
/* src/public/js/resetPass/index.js */
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

      const response = await fetch('/api/users/resetpass', {
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
          const data = await response.json();

          if (data.error) {
            if (data.error === 'Usuario no encontrado') {
              swal('El usuario no existe', 'No se pudo recuperar la contraseña', 'error');
            } else if (data.error === 'La nueva contraseña es la misma que la contraseña actual. No se puede colacar la misma contraseña.') {
              swal('Misma contraseña', 'La nueva contraseña ingresada es la misma que la contraseña actual.Vuelva a intentarlo con otra contraseña.', 'error');
            } else {
              swal('Error', 'No se pudo recuperar la contraseña', 'error');
            }
          } else {
            swal('Error', 'Nos se pudo recuperar la contraseña', 'error');
          }
        } catch (error) {
          console.error('Error parsing error response:', error);
        }
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      swal('Error', 'No se pudo recuperar la contraseña', 'error');
    }
  });
});
