/* ************************************************************************** */
/* src/public/js/payments/index.js */
/* ************************************************************************** */

const stripePublicKey = 'pk_test_51O69qCIUsFN5LUdhh17aixOzY2F9cdE6ObjOtapbb2mevmnGoHRI0OUuGWw33IajRfbLd1KktEPd0q56004fsYsn003FFRF4N9';
const stripe = Stripe(stripePublicKey);
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');

const form = document.getElementById('payment-form');
const cardError = document.getElementById('card-errors');
const submitFinalizarBtn = document.getElementById('submit-finalizar-btn');

const cartDivId = document.getElementById('cartDivId');
const cartId = cartDivId.getAttribute('data-cart-id');

const emailDivId = document.getElementById('emailDivId');
const userEmail = cartDivId.getAttribute('data-email-id');

submitFinalizarBtn.addEventListener('click', async function () {
  try {
    const result = await stripe.createToken(card);

    if (result.error) {
      cardError.textContent = result.error.message;
    } else {
      const token = result.token.id;

      await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });
      try {
        const purchaseResponse = await fetch(`/api/carts/${cartId}/purchasecart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (purchaseResponse.ok) {
          swal({
            title: '¡Compra realizada!',
            text: 'Revise su casilla de correo electrónico con los detalles de la compra.',
            icon: 'success',
            buttons: {
              confirm: 'Volver a comprar',
            },
          }).then(function () {
            window.location.href = '/products';
          });
        } else {
          swal('Error', 'Hubo un problema al realizar la compra. Inténtelo de nuevo más tarde.', 'error');
        }
      } catch (error) {
        console.error('Error during purchase:', error);
      }
    }
  } catch (error) {
    console.error('Error during payment:', error);
  }
});
