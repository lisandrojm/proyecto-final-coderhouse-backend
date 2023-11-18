/* ************************************************************************** */
/* /src/public/js/resetPassExpiredTokenl/index.js */
/* ************************************************************************** */

const mostrarSweetAlertSuccess = () => {
  swal('¡Email enviado!', 'Revisa tu casilla de correo electrónico para reestablecer la contraseña.', 'success').then(() => {
    window.location.href = '/';
  });
};

const mostrarSweetAlertError = () => {
  swal('¡Email no registrado!', 'Complete el formulario de registro y una vez registrado ingrese por Login', 'error').then(() => {
    window.location.href = '/register';
  });
};

const submitForm = async (event) => {
  event.preventDefault();

  try {
    const email = document.getElementById('email').value;

    const response = await fetch(`/api/users/resetpassbyemail?email=${email}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      mostrarSweetAlertSuccess();
    } else {
      mostrarSweetAlertError();
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
