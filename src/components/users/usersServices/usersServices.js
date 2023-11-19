/* ************************************************************************** */
/* src/components/users/usersServices/usersServices.js */
/* ************************************************************************** */
/* Funcionalidad: Users CRUD  */

const { User } = require('../../../models/users');
const JWTService = require('../../../utils/jwt/jwt');
const jwt = require('jsonwebtoken');
const { createHash } = require('../../../utils/bcrypt/bcrypt');
const { Cart } = require('../../../models/carts');
const { config } = require('../../../config');
const { cartsServices } = require('../../../repositories/index');
const { usersServices } = require('../../../repositories/index');
const CustomError = require('../../../utils/errors/services/customError');
const EErrors = require('../../../utils/errors/services/enums');
const { generateUserErrorInfo } = require('../../../utils/errors/services/info');
const MailManager = require('../../../utils/mailManager/mailManager');
const path = require('path');
const PORT = `${config.port}`;
const bcrypt = require('bcrypt');
const req = require('../../../utils/logger/loggerSetup');
const faker = require('faker');

class UsersServices {
  constructor() {
    this.createUsersIfNotExists(req);
  }

  createUsersIfNotExists = async () => {
    const usersToCreate = [
      { email: 'admin@correo.com', firstName: 'admin', role: 'admin' },
      { email: 'user@correo.com', firstName: 'user', role: 'user' },
      { email: 'premium@correo.com', firstName: 'premium', role: 'premium' },
    ];
    for (const userData of usersToCreate) {
      const { email, firstName, role } = userData;
      const existingUser = await usersServices.findOne({ email });
      if (!existingUser) {
        const newUser = new User({
          first_name: firstName,
          last_name: firstName,
          email,
          age: 33,
          password: createHash('1234'),
          role,
        });
        try {
          const savedUser = await usersServices.createUserDTO(newUser);
          const userCart = new Cart({
            user: savedUser._id,
            products: [],
          });
          await cartsServices.save(userCart);
          savedUser.cart = userCart._id;
          savedUser.last_connection = new Date();
          await savedUser.save();
          const token = await JWTService.generateJwt({ id: savedUser._id });
          await usersServices.findByIdAndUpdate(savedUser._id, { token }, { new: true });
          req.logger.info(`Usuario "${firstName} Role: ${role}" creado con éxito. Register for Testing last_connection -> new: ${savedUser.last_connection}`);
        } catch (error) {}
      }
    }
  };

  getPrincipalDataUser = async (req, res) => {
    try {
      const users = await usersServices.findAll();
      const dataPromises = users.map((user) => usersServices.getPrincipalDataUserDTO(user));
      const data = await Promise.all(dataPromises);
      return res.sendSuccess({ message: 'Todos los datos principales de los usuarios obtenidos satisfactoriamente', payload: data });
    } catch (error) {
      return res.sendServerError('Error al obtener los datos principales de los usuarios');
    }
  };

  getUsers = async (limit, page, query, res) => {
    try {
      const options = {
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page) : 1,
      };

      const filter = query
        ? {
            role: query,
          }
        : {};
      const users = await usersServices.paginate(filter, options);
      const data = {
        status: 'success',
        payload: users.docs,
        totalPages: users.totalPages,
        prevPage: users.prevPage || null,
        nextPage: users.nextPage || null,
        page: users.page,
        hasPrevPage: users.hasPrevPage,
        hasNextPage: users.hasNextPage,
        prevLink: users.hasPrevPage ? `/users?limit=${options.limit}&page=${users.prevPage}` : null,
        nextLink: users.hasNextPage ? `/users?limit=${options.limit}&page=${users.nextPage}` : null,
      };
      return res.sendSuccess({ message: 'Usuarios obtenidos satisfactoriamente', payload: data });
    } catch (error) {
      return res.sendServerError('Error al obtener los usuarios');
    }
  };

  getUserById = async (uid, res) => {
    try {
      const user = await usersServices.findById(uid);
      if (!user) {
        return res.sendNotFound('Usuario no encontrado');
      }
      const data = user;
      return res.sendSuccess({ message: 'Usuario obtenido correctamente', payload: data });
    } catch (error) {
      return res.sendServerError('Error al obtener el usuario');
    }
  };

  getUsersViews = async (limit, page, query, res) => {
    try {
      const options = {
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page) : 1,
      };
      const filter = query
        ? {
            role: query,
          }
        : {};
      const result = await usersServices.paginate(filter, options);
      const formattedUsers = result.docs.map((user) => {
        return {
          _id: user._id,
          email: user.email,
          role: user.role,
          cart: user.cart,
          platform: user.platform,
        };
      });
      const totalPages = result.totalPages;
      const currentPage = result.page;
      const hasPrevPage = result.hasPrevPage;
      const hasNextPage = result.hasNextPage;
      const prevPage = result.hasPrevPage ? result.prevPage : null;
      const nextPage = result.hasNextPage ? result.nextPage : null;
      const prevLink = result.hasPrevPage ? `/admin/dashboard/users?limit=${options.limit}&page=${result.prevPage}` : null;
      const nextLink = result.hasNextPage ? `/admin/dashboard/users?limit=${options.limit}&page=${result.nextPage}` : null;
      return {
        users: formattedUsers,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        totalPages,
        currentPage,
        prevLink,
        nextLink,
      };
    } catch (error) {
      return res.sendServerError('Error al obtener los usuarios');
    }
  };

  registerUser = async (req, payload, res) => {
    try {
      const { first_name, last_name, email, age, password, role } = payload;

      if (!first_name || !last_name || !email || !age || !password) {
        try {
          CustomError.createError({
            name: 'User creation error',
            cause: generateUserErrorInfo({ first_name, last_name, age, email, password }),
            message: 'Error Trying to create User',
            code: EErrors.INVALID_TYPES_ERROR,
          });
        } catch (error) {
          console.error('Ocurrió un error en CustomError:', error);
        }
        return res.sendServerError('Faltan campos obligatorios');
      }
      const existingUser = await usersServices.findOne({ email: email });
      if (existingUser) {
        req.logger.warn('Ya existe un usuario con el mismo correo electrónico');
        return res.sendUserError('Ya existe un usuario con el mismo correo electrónico');
      }
      const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role,
      });
      const savedUser = await usersServices.createUserDTO(newUser);
      const userCart = new Cart({
        user: savedUser._id,
        products: [],
      });
      await cartsServices.save(userCart);
      savedUser.cart = userCart._id;
      savedUser.last_connection = new Date();
      await savedUser.save();
      const data = newUser;
      const token = await JWTService.generateJwt({ id: savedUser._id });
      await usersServices.findByIdAndUpdate(savedUser._id, { token }, { new: true });
      req.logger.info(`Usuario"${first_name}" creado con éxito. Register last_connection -> new: ${savedUser.last_connection}`);
      return res.sendCreated({
        payload: {
          message: 'Usuario agregado correctamente',
          token,
          data,
        },
      });
    } catch (error) {
      req.logger.error('Error al agregar el usuario');
      return res.sendServerError('Error al agregar el usuario');
    }
  };

  recoveryUser = async ({ email, password, res }) => {
    try {
      let user = await usersServices.findOne({
        email: email,
      });
      if (!user) {
        return res.sendUnauthorized('El usuario no existe en la base de datos');
      }
      let data = await usersServices.findByIdAndUpdate(user._id, { password: createHash(password) }, { new: true });
      return res.sendSuccess({ message: 'Contraseña actualizada correctamente', payload: data });
    } catch (error) {
      return res.sendServerError('Error al recuperar la contraseña');
    }
  };

  resetPass = async ({ email, password, res, req }) => {
    try {
      const user = await usersServices.findOne({ email });
      if (!user) {
        req.logger.info('Usuario no encontrado');
        return res.sendNotFound('Usuario no encontrado');
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        req.logger.info('La nueva contraseña es la misma que la contraseña actual.');
        return res.sendUserError('La nueva contraseña es la misma que la contraseña actual. No se puede colacar la misma contraseña.');
      }
      const newPasswordHash = createHash(password);
      let data = await usersServices.findByIdAndUpdate(user._id, { password: newPasswordHash }, { new: true });
      req.logger.info('Contraseña actualizada');
      return res.sendSuccess({ message: 'Contraseña actualizada correctamente', payload: data });
    } catch (error) {
      req.logger.error('Error al recuperar la contraseña');
      return res.sendServerError('Error al recuperar la contraseña');
    }
  };

  resetPassByEmail = async (email, res, req) => {
    try {
      const user = await usersServices.findOne({ email });
      if (!user) {
        return res.sendNotFound('Usuario no encontrado');
      }
      const username = user.email;
      const resetPasswordToken = jwt.sign({ userId: user._id }, config.jwt_secret, {
        expiresIn: '1h',
      });
      const resetPasswordLink = `http://localhost:${PORT}/resetpass/${resetPasswordToken}`;
      const emailContent = `
      <h1>Reestablezca su contraseña</h1>
      <p>Username: ${username}</p>
      <p>Acceda <a href="${resetPasswordLink}">aquí</a> para reestablecer su contraseña.</p>
      <!-- Agrega cualquier otra información que desees en el correo -->
    `;
      const attachments = [
        {
          filename: 'freelo.png',
          path: path.join(__dirname, '../../../uploads/mail/freelo.png'),
        },
      ];
      const emailPayload = {
        from: 'lisandrojm@gmail.com',
        to: user.email,
        subject: 'FreeloECOM - Reestablecimiento de contraseña',
        html: emailContent,
        attachments,
      };
      await MailManager.sendEmail(emailPayload);
      const data = emailPayload;
      res.cookie('resetPasswordToken', resetPasswordToken, { maxAge: 3600000 }); // Cookie expira en 1 hora (3600000 ms)
      req.logger.info('Mail de reestablecimiento de contraseña enviado correctamente');
      return res.sendSuccess({
        payload: {
          message: 'Mail de reestablecimiento de contraseña enviado correctamente',
          data,
        },
      });
    } catch (error) {
      req.logger.error('Error al reestablecer la contraseña y enviar el correo electrónico');
      return res.sendServerError('Error al reestablecer la contraseña y enviar el correo electrónico');
    }
  };

  uploadDocuments = async (uid, res, req) => {
    try {
      const user = await usersServices.findById(uid);
      if (!user) {
        return res.sendNotFound('Usuario no encontrado');
      }
      if (!req.files || req.files.length === 0) {
        return res.sendUserError('No se cargaron documentos');
      }
      const documentInfo = req.files.map((file) => {
        return {
          name: file.filename,
          reference: file.destination,
          mimetype: file.mimetype,
          fieldname: file.fieldname,
        };
      });
      const newDocumentName = documentInfo[documentInfo.length - 1].name;
      user.documents.push(...documentInfo);
      const hasIdentificacion = user.documents.some((doc) => doc.fieldname === 'identificacion');
      const hasComprobanteDeDomicilio = user.documents.some((doc) => doc.fieldname === 'comprobanteDeDomicilio');
      const hasComprobanteDeEstadoDeCuenta = user.documents.some((doc) => doc.fieldname === 'comprobanteDeEstadoDeCuenta');
      if (hasIdentificacion && hasComprobanteDeDomicilio && hasComprobanteDeEstadoDeCuenta) {
        user.premium_documents_status = 'upload';
      } else {
        user.premium_documents_status = 'pending';
      }
      user.documents_status = 'upload';
      const savedUser = await user.save();
      const newlyCreatedDocument = savedUser.documents.find((doc) => doc.name === newDocumentName);
      if (newlyCreatedDocument) {
        const documentIds = documentInfo.map((file) => {
          const matchingDocument = savedUser.documents.find((doc) => doc.name === file.name);
          return matchingDocument._id;
        });
        const updatedDocumentInfo = documentInfo.map((file, index) => {
          return {
            id: documentIds[index],
            name: file.name,
            reference: file.reference,
            mimetype: file.mimetype,
            fieldname: file.fieldname,
          };
        });
        const data = {
          user: savedUser,
          documents: updatedDocumentInfo,
        };

        req.app.io.emit('newDocument', data);
        req.app.io.emit('newStatus', data);

        return res.sendSuccess({ message: 'Documentos subidos correctamente', payload: data });
      } else {
        return res.sendServerError('Error al subir documentos');
      }
    } catch (error) {
      return res.sendServerError('Error al subir documentos');
    }
  };

  updateUser = async (uid, updateFields, res, req) => {
    try {
      const allowedFields = ['first_name', 'last_name', 'email', 'age', 'password', 'role'];
      const invalidFields = Object.keys(updateFields).filter((field) => !allowedFields.includes(field));
      if (invalidFields.length > 0) {
        return res.sendUserError(`Los siguientes campos no se pueden modificar: ${invalidFields.join(', ')}`);
      }
      if (updateFields.hasOwnProperty('role')) {
        if (!['admin', 'user', 'premium'].includes(updateFields.role)) {
          return res.sendUserError('El campo "role" solo puede cambiar a "admin", "user" o "premium"');
        }
      }
      const updatedUser = await usersServices.findByIdAndUpdate(uid, updateFields, { new: true });
      if (!updatedUser) {
        return res.sendNotFound('Usuario no encontrado');
      }
      req.app.io.emit('updateUser', updatedUser);
      const data = updatedUser;
      return res.sendSuccess({ message: 'Usuario actualizado correctamente', payload: data });
    } catch (error) {
      return res.sendServerError('Error al actualizar el usuario');
    }
  };

  updateUserPremium = async (uid, updateFields, res, req) => {
    try {
      const allowedFields = ['role'];
      if (updateFields.hasOwnProperty('role') && !['user', 'premium'].includes(updateFields.role)) {
        return res.sendUserError('Eres un user premium. El campo role solo puedes cambiarlo a user o premium');
      }
      const user = await usersServices.findById(uid);
      if (!user) {
        return res.sendNotFound('Usuario no encontrado');
      }
      if (updateFields.role === 'premium') {
        if (user.premium_documents_status !== 'upload') {
          return res.sendUserError('El usuario no ha completado la documentación necesaria para ser premium');
        }
      }
      const invalidFields = Object.keys(updateFields).filter((field) => !allowedFields.includes(field));
      if (invalidFields.length > 0) {
        return res.sendUserError(`Los siguientes campos no se pueden modificar: ${invalidFields.join(', ')}`);
      }
      const updatedUser = await usersServices.findByIdAndUpdate(uid, updateFields, { new: true });
      if (!updatedUser) {
        return res.sendNotFound('Usuario no encontrado');
      }

      req.app.io.emit('updateUser', updatedUser);

      const data = updatedUser;
      return res.sendSuccess({ message: 'Role de user actualizado correctamente', payload: data });
    } catch (error) {
      return res.sendServerError('Error al actualizar el usuario');
    }
  };

  deleteUser = async (uid, res, req) => {
    try {
      const deletedUser = await usersServices.findByIdAndDelete(uid);
      if (!deletedUser) {
        return res.sendNotFound('Usuario no encontrado');
      }
      req.app.io.emit('deleteUser', uid);
      const data = deletedUser;
      const totalUsers = await usersServices.countDocuments({});
      req.app.io.emit('totalUsersUpdate', totalUsers);
      return res.sendSuccess({ message: 'Usuario eliminado correctamente', payload: data });
    } catch (error) {
      return res.sendServerError('Error al eliminar el usuario');
    }
  };

  deleteInactiveUsers = async (req, res) => {
    try {
      /* Para realizar el testing de la eliminación de usuarios inactivos puedes cambiar el tiempo a 1 minuto con: */
      /* const twoDaysAgo = new Date(Date.now() - 1 * 60 * 1000);  */
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const inactiveUsers = await User.find({ last_connection: { $lt: twoDaysAgo } });
      const inactiveUserEmails = inactiveUsers.map((user) => user.email);
      if (inactiveUserEmails.length > 0) {
        req.logger.info(`→ Usuario/s eliminado/s de la base de datos por inactividad: "${inactiveUserEmails}"`);
      }
      if (inactiveUsers.length > 0) {
        const emailPromises = inactiveUsers.map(async (user) => {
          const registerLink = `http://localhost:8080/register`;
          const emailContent = `
          <h1>Cuenta eliminada por inactividad</h1>
          <p>Hola ${user.first_name},</p>
          <p>Lamentablemente tu cuenta ha sido eliminada de nuestra plataforma debido a inactividad.</p>
          <p>Si deseas volver a utilizar nuestros servicios, por favor regístrate nuevamente <a href="${registerLink}">aquí</a>.</p>
        `;
          const attachments = [
            {
              filename: 'freelo.png',
              path: path.join(__dirname, '../../../uploads/mail/freelo.png'),
            },
          ];
          const emailPayload = {
            from: 'lisandrojm@gmail.com',
            to: user.email,
            subject: 'FreeloECOM - Cuenta eliminada por inactividad',
            html: emailContent,
            attachments,
          };
          try {
            await MailManager.sendEmail(emailPayload);
          } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
          }
        });
        await Promise.all(emailPromises);
        const deletedUsers = await User.deleteMany({ last_connection: { $lt: twoDaysAgo } });
        if (deletedUsers.deletedCount > 0) {
          return res.sendSuccess({
            message: 'Usuarios eliminados por inactividad correctamente',
            payload: {
              count: deletedUsers.deletedCount,
              users: inactiveUsers,
            },
          });
        }
      } else {
        req.logger.info('→ No se encontraron usuarios inactivos para eliminar de la base de datos');
        return res.sendNotFound('No se encontraron usuarios inactivos');
      }
      return res.sendServerError('Error al eliminar usuarios inactivos');
    } catch (error) {
      return res.sendServerError('Error al eliminar usuarios inactivos');
    }
  };

  deleteDocumentById = async (uid, did, res, req) => {
    try {
      const user = await usersServices.findById(uid);
      if (!user) {
        return res.sendNotFound('Usuario no encontrado');
      }
      const documentIndex = user.documents.findIndex((doc) => doc._id.toString() === did);
      if (documentIndex === -1) {
        return res.sendNotFound('Documento no encontrado');
      }
      const deletedDocument = user.documents.splice(documentIndex, 1)[0];
      if (user.documents.length === 0) {
        user.documents_status = 'pending';
      }
      const hasIdentificacion = user.documents.some((doc) => doc.fieldname === 'identificacion');
      const hasComprobanteDeDomicilio = user.documents.some((doc) => doc.fieldname === 'comprobanteDeDomicilio');
      const hasComprobanteDeEstadoDeCuenta = user.documents.some((doc) => doc.fieldname === 'comprobanteDeEstadoDeCuenta');
      if (!hasIdentificacion || !hasComprobanteDeDomicilio || !hasComprobanteDeEstadoDeCuenta) {
        user.premium_documents_status = 'pending';
      }
      await user.save();
      const data = {
        deletedDocumentID: deletedDocument._id,
        remainingDocuments: user.documents,
        user: user,
      };

      req.app.io.emit('newStatus', data);

      return res.sendSuccess({
        message: 'Documento eliminado del usuario correctamente',
        payload: data,
      });
    } catch (error) {
      return res.sendServerError('Error al eliminar el documento');
    }
  };
  createFakeUser = async (req, res) => {
    const fakeUser = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      age: faker.datatype.number({ min: 18, max: 65 }),
      password: 'password123',
      role: 'user',
    };

    const newUser = new User({
      first_name: fakeUser.first_name,
      last_name: fakeUser.last_name,
      email: fakeUser.email,
      age: fakeUser.age,
      password: createHash(fakeUser.password),
      role: fakeUser.role,
    });

    try {
      const savedUser = await usersServices.createUserDTO(newUser);

      const userCart = new Cart({
        user: savedUser._id,
        products: [],
      });

      await cartsServices.save(userCart);
      savedUser.cart = userCart._id;
      savedUser.last_connection = new Date();
      await savedUser.save();

      const token = await JWTService.generateJwt({ id: savedUser._id });
      await usersServices.findByIdAndUpdate(savedUser._id, { token }, { new: true });

      req.logger.info(`Fake user "${fakeUser.first_name}" created successfully. Register for Testing last_connection -> new: ${savedUser.last_connection}`);

      return res.sendCreated({
        payload: {
          message: 'Fake user registrado satisfactoriamente',
          token,
          data: savedUser,
        },
      });
    } catch (error) {
      req.logger.error('Error creando fake user:', error);
      return res.sendServerError('Error crendo fake user');
    }
  };
}

module.exports = new UsersServices();
