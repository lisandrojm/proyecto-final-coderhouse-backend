/* ************************************************************************** */
/* src/components/carts/cartsServices/cartsServices.js */
/* ************************************************************************** */
/* Funcionalidad: Carts CRUD  */

const { cartsServices } = require('../../../repositories/index');
const { productsServices } = require('../../../repositories/index');
const { ticketsServices } = require('../../../repositories/index');
const { Ticket } = require('../../../models/tickets');
const jwtUtils = require('../../../utils/jwt/jwt');
const { v4: uuidv4 } = require('uuid');
const MailManager = require('../../../utils/mailManager/mailManager');
const path = require('path');
const { Product } = require('../../../models/products'); // Importa el modelo de Producto o la referencia a tus productos
const req = require('../../../utils/logger/loggerSetup');

class CartsServices {
  /*   constructor() {
    this.initializeCartCollection();
  } */

  /*   initializeCartCollection = async () => {
    try {
      const cartCount = await cartsServices.countDocuments();
      if (cartCount === 0) {
        await cartsServices.create({ products: [] });
      }
    } catch (error) {
      req.logger.error('Error al inicializar la colección de carritos en la base de datos.', error);
    }
  };
 */
  getCarts = async (res) => {
    try {
      const carts = await cartsServices.findAll();
      const data = carts;
      return res.sendSuccess({
        payload: {
          message: 'Carritos enviados correctamente',
          data,
        },
      });
    } catch (error) {
      return res.sendServerError('Error al obtener los carritos');
    }
  };

  getCartProductById = async (cid, res) => {
    try {
      const cart = await cartsServices.findById(cid, { path: 'products.productId' });
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }
      const data = cart.products;
      return res.sendSuccess({
        payload: {
          message: 'Productos del carrito obtenidos correctamente',
          data,
        },
      });
    } catch (error) {
      return res.sendServerError('Error al obtener los productos del carrito');
    }
  };

  addCart = async (res) => {
    try {
      const newCart = await cartsServices.create({ products: [] });
      const data = newCart;
      return res.sendCreated({
        payload: {
          message: 'Nuevo carrito creado',
          data,
        },
      });
    } catch (error) {
      return res.sendServerError('Error al crear el carrito');
    }
  };

  addProductToCart = async (cid, pid, quantity, res, req) => {
    try {
      const cart = await cartsServices.findById(cid);
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }
      const product = await productsServices.findById(pid);
      if (!product) {
        return res.sendNotFound('ID de Producto no encontrado');
      }
      const userData = req.session.user || req.user;

      if (userData && userData.role === 'premium' && product.owner === userData._id) {
        return res.sendServerError('No puedes agregar tu propio producto creado como owner premium al carrito creado ');
      }
      const productIndex = cart.products.findIndex((p) => p.productId.toString() === pid);
      if (productIndex === -1) {
        const newProduct = {
          productId: pid,
          quantity: quantity || 1,
        };
        cart.products.push(newProduct);
      } else {
        cart.products[productIndex].quantity += quantity || 1;
      }

      await cartsServices.save(cart);
      const data = cart;
      return res.sendSuccess({
        message: 'Producto agregado al carrito correctamente',
        payload: data,
      });
    } catch (error) {
      return res.sendServerError('Error al agregar el producto al carrito');
    }
  };

  purchaseCart = async (cid, req, res) => {
    const ticketCode = uuidv4();
    try {
      const cart = await cartsServices.findById(cid);
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }
      const productsToPurchase = cart.products;
      const productsNotPurchased = [];
      if (productsToPurchase.length === 0) {
        return res.sendNotFound('No se encontraron productos en el carrito');
      }
      for (const productData of productsToPurchase) {
        const { productId, quantity } = productData;

        const product = await productsServices.findById(productId);

        if (product && product.stock >= quantity) {
          product.stock -= quantity;
          await productsServices.save(product);
        } else {
          productsNotPurchased.push(productId);
        }
      }
      const jwtToken = req.cookies.jwt;
      let username = null;
      if (jwtToken) {
        const decodedToken = await jwtUtils.verify(jwtToken); // Verifica el token
        if (decodedToken) {
          username = decodedToken.email;
        }
      }
      if (!username && req.session.user) {
        username = req.session.user.email;
      }
      const ticket = new Ticket({
        code: ticketCode,
        purchase_datetime: Date.now(),
        amount: productsToPurchase.length - productsNotPurchased.length,
        purchaser: username,
      });
      await ticketsServices.create(ticket);
      cart.products = productsToPurchase.filter((productData) => productsNotPurchased.includes(productData.productId));
      await cartsServices.save(cart);
      if (productsNotPurchased.length === 0) {
        return res.sendSuccess({
          message: 'Compra exitosa. Todos los productos fueron comprados.',
          payload: {
            productsPurchased: productsToPurchase,
          },
        });
      } else {
        return res.sendSuccess({
          message: 'Compra parcial. Algunos productos no pudieron ser comprados.',
          payload: {
            productsNotPurchased,
          },
        });
      }
    } catch (error) {
      return res.sendServerError('Error al procesar la compra');
    }
  };

  purchaseCartMail = async (cid, req, res) => {
    const ticketCode = uuidv4();
    try {
      const cart = await cartsServices.findById(cid);
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }
      const productsToPurchase = cart.products;
      const productsNotPurchased = [];
      if (productsToPurchase.length === 0) {
        return res.sendNotFound('No se encontraron productos en el carrito');
      }
      for (const productData of productsToPurchase) {
        const { productId, quantity } = productData;
        const product = await productsServices.findById(productId);
        if (product && product.stock >= quantity) {
          product.stock -= quantity;
          await productsServices.save(product);
        } else {
          productsNotPurchased.push(productId);
        }
      }
      const jwtToken = req.cookies.jwt;
      let username = null;
      if (jwtToken) {
        const decodedToken = await jwtUtils.verify(jwtToken); // Verifica el token
        if (decodedToken) {
          username = decodedToken.email;
        }
      }
      if (!username && req.session.user) {
        username = req.session.user.email;
      }
      const ticket = new Ticket({
        code: ticketCode,
        purchase_datetime: Date.now(),
        amount: productsToPurchase.length - productsNotPurchased.length,
        purchaser: username, // Utiliza el nombre de usuario extraído del token o la sesión
      });
      await ticketsServices.create(ticket);
      cart.products = productsToPurchase.filter((productData) => productsNotPurchased.includes(productData.productId));
      await cartsServices.save(cart);
      const emailContent = `
        <h1>Resultado de la compra</h1>
        <p>Ticket Code: ${ticketCode}</p>
        <p>Username: ${username}</p>
        <p>Total Products: ${productsToPurchase.length}</p>
        <p>Products Purchased: ${productsToPurchase.length - productsNotPurchased.length}</p>
        <p>Products Not Purchased: ${productsNotPurchased.length}</p>
        <h2>Productos Comprados</h2>
        <ul>
          ${productsToPurchase.map((productData) => `<li>${productData.productId}: ${productData.quantity}</li>`).join('')}
        </ul>
      `;
      const attachments = [
        {
          filename: 'freelo.png',
          path: path.join(__dirname, '../../../uploads/mail/freelo.png'),
        },
      ];
      const emailPayload = {
        from: 'lisandrojm@gmail.com',
        to: username, // El destinatario es el usuario obtenido del token o la sesión
        subject: 'FreeloECOM - Resultado de la compra',
        html: emailContent,
        attachments,
      };
      await MailManager.sendEmail(emailPayload);
      if (productsNotPurchased.length === 0) {
        return res.sendSuccess({
          message: 'Compra exitosa. Todos los productos fueron comprados.',
          payload: {
            productsPurchased: productsToPurchase,
          },
        });
      } else {
        return res.sendSuccess({
          message: 'Compra parcial. Algunos productos no pudieron ser comprados.',
          payload: {
            productsNotPurchased,
          },
        });
      }
    } catch (error) {
      return res.sendServerError('Error al procesar la compra y enviar el correo electrónico');
    }
  };

  updateCart = async (cid, products, res) => {
    try {
      const cart = await cartsServices.findById(cid);
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }
      cart.products = products;
      await cartsServices.save(cart);
      const data = cart;
      return res.sendSuccess({
        message: 'Carrito actualizado correctamente',
        payload: data,
      });
    } catch (error) {
      return res.sendServerError('Error al actualizar el carrito');
    }
  };

  updateProductQuantity = async (cid, pid, quantity, res) => {
    try {
      /* Repository */
      const cart = await cartsServices.findById(cid);
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }

      const productIndex = cart.products.findIndex((p) => p.productId.toString() === pid);
      if (productIndex === -1) {
        return res.sendNotFound('Producto no encontrado en el carrito');
      }

      cart.products[productIndex].quantity = quantity;
      /* Repository */
      console.log('Quantity', quantity);

      const data = cart;

      return res.sendSuccess({
        message: 'Cantidad de producto actualizada correctamente',
        payload: data,
      });
    } catch (error) {
      return res.sendServerError('Error al actualizar la cantidad de producto en el carrito');
    }
  };

  deleteCart = async (cid, res) => {
    try {
      const cart = await cartsServices.findById(cid);
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }
      await cartsServices.deleteOne(cart);
      const data = cart;
      return res.sendSuccess({
        message: 'Carrito eliminado correctamente',
        payload: data,
      });
    } catch (error) {
      return res.sendServerError('Error al eliminar el carrito');
    }
  };

  deleteProductFromCart = async (cid, pid, res, req) => {
    try {
      const cart = await cartsServices.findById(cid);
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }
      const productIndex = cart.products.findIndex((p) => p.productId.toString() === pid);
      if (productIndex === -1) {
        return res.sendNotFound('Producto no encontrado en el carrito');
      }
      cart.products.splice(productIndex, 1); // Elimina el producto del carrito
      await cartsServices.save(cart);
      const updatedTotalProducts = cart.products.reduce((total, product) => total + product.quantity, 0);
      req.app.io.emit('updateTotalCartProducts', updatedTotalProducts);
      const productsInCart = cart.products;
      const productIds = productsInCart.map((item) => item.productId);
      const products = await Product.find({ _id: { $in: productIds } });
      const totalAmount = productsInCart.reduce((acumulador, item) => {
        const product = products.find((p) => p._id.toString() === item.productId._id.toString()); // Cambio en la comparación
        if (product) {
          return acumulador + product.price * item.quantity;
        } else {
          return acumulador;
        }
      }, 0);

      req.app.io.emit('totalAmount', totalAmount);

      return res.sendSuccess({
        message: 'Producto eliminado del carrito correctamente',
        payload: cart,
      });
    } catch (error) {
      return res.sendServerError('Error al eliminar el producto del carrito');
    }
  };

  deleteAllProductsFromCart = async (cid, res) => {
    try {
      const cart = await cartsServices.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });
      if (!cart) {
        return res.sendNotFound('Carrito no encontrado');
      }
      const data = cart;
      return res.sendSuccess({
        message: 'Todos los productos eliminados del carrito',
        payload: data,
      });
    } catch (error) {
      return res.sendServerError('Error al eliminar todos los productos del carrito');
    }
  };
}

module.exports = new CartsServices();
