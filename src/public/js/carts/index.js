/* ************************************************************************** */
/* src/public/js/carts/index.js */
/* ************************************************************************** */

const socket = io();

const deleteCartRow = (pid) => {
  try {
    const documentRow = document.getElementById(pid);
    if (documentRow) {
      documentRow.remove();
    }

    const totalCartProducts = parseInt(document.getElementById('totalProductosCarrito').textContent);
    if (totalCartProducts === 0) {
      emptyCartDiv();
    }
  } catch (error) {
    console.error('Error al eliminar la fila del carrito:', error);
  }
};

const deleteAllRows = () => {
  try {
    const comprarBtn = document.querySelector('.comprar_btn');
    const tableBody = document.querySelector('.tbody');
    if (tableBody) {
      while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
        comprarBtn.disabled = true;
      }
    }
  } catch (error) {
    console.error('Error al eliminar todas las filas del carrito:', error);
  }
};

const emptyCartDiv = () => {
  try {
    const emptyCartDiv = document.querySelector('.emptyCart');
    if (emptyCartDiv) {
      while (emptyCartDiv.firstChild) {
        emptyCartDiv.removeChild(emptyCartDiv.firstChild);
      }
    }
  } catch (error) {
    console.error('Error al vaciar el contenido del carrito:', error);
  }
};

const updateTotalCartProducts = (total) => {
  try {
    const totalProductosCarrito = document.getElementById('totalProductosCarrito');
    if (totalProductosCarrito) {
      totalProductosCarrito.textContent = total;
    }
  } catch (error) {
    console.error('Error al actualizar la cantidad total de productos en el carrito:', error);
  }
};

const updateTotalAmount = (total) => {
  try {
    const totalAmountValue = document.getElementById('totalAmountValue');
    if (totalAmountValue) {
      totalAmountValue.textContent = total;
    }
  } catch (error) {
    console.error('Error al actualizar el monto total en el carrito:', error);
  }
};

const cartDivId = document.getElementById('cartDivId');
const cartId = cartDivId.getAttribute('data-cart-id');

const deleteCartProduct = (pid) => {
  try {
    fetch(`/api/carts/${cartId}/product/${pid}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          socket.emit('deleteCartProduct', pid);
        } else {
          console.error('Error al eliminar el producto');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  } catch (error) {
    console.error('Error en la solicitud de eliminación del producto:', error);
  }
};

const deleteAllProductsCart = () => {
  try {
    fetch(`/api/carts/${cartId}/products`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          socket.emit('deleteAllProductsCart', cartId);
        } else {
          console.error('Error al vaciar el carrito');
        }
      })
      .catch((error) => {
        console.error('Error al vaciar el carrito:', error);
      });
  } catch (error) {
    console.error('Error en la solicitud de eliminación de todos los productos del carrito:', error);
  }
};

socket.on('deleteCartProduct', deleteCartRow);
socket.on('updateTotalCartProducts', (total) => {
  updateTotalCartProducts(total);
  document.getElementById('totalAmountValue').innerText = totalAmount;
});
socket.on('deleteAllProductsCart', () => {
  deleteAllRows();
  updateTotalCartProducts(0);
  updateTotalAmount(0);
  emptyCartDiv();
});
socket.on('totalAmount', (totalAmount) => {
  document.getElementById('totalAmountValue').innerText = totalAmount;
});
