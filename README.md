# PROYECTO FINAL - Coderhouse/Backend

Este repositorio contiene "El Proyecto Final" del curso de Back-End de Coderhouse.

## Requerimientos específicos:

### Router /api/users - rutas

- GET / - Obtiene a todos los usuarios y solo devuelve los datos principales: nombre, correo y tipo de cuenta (role).

  - <small>Directorio/s de referencia</small>

    - `/src/components/users/index.js`: Rutas de users.
    - `/src/components/users/usersController/usersController.js` : Controlador del método getPrincipalDataUser.
    - `/src/components/users/usersServices/usersServices.js`: Servicios del método getPrincipalDataUser.

- DELETE / - Limpia a todos los usuarios que no hayan tenido conexión en los últimos 2 días y le envía un correo al usuario indicándole que su cuenta ha sido eliminada por inactividad. (Puedes hacer pruebas con el último minuto, por ejemplo. Ver código comentado del método **deleteInactiveUsers**).

  - <small>Directorio/s de referencia</small>

    - `/src/components/users/index.js`: Rutas de users.
    - `/src/components/users/usersController/usersController.js` : Controlador del método deleteInactiveUsers.
    - `/src/components/users/usersServices/usersServices.js`: Servicios del método deleteInactiveUsers.

### Views

- ADMIN View - Vista donde se puede visualizar, modificar el role y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerc.

  - <small>Directorio/s de referencia</small>

    - `/src/views/layouts/main.handlebars`: Main del motor de plantillas handlebars.
    - `/src/views/adminDashboardUsers.handlebars` : Vista del Admin Dashboard de Usuarios.

    - `/src/components/handlebars/index.js`: Rutas de views.
    - `/src/components/handlebars/handlebarsController/handlebarsController.js` : Controlador del método getAdminDashboardUsers.
    - `/src/components/handlebars/handlebarsServices/handlebarsServices.js`: Servicio del método getAdminDashboardUsers.

    - `/src/components/users/index.js`: Rutas de users.
    - `/src/components/users/usersController/usersController.js` : Controlador de los métodos getUserViews, updateUser y deletUser.
    - `/src/components/users/usersServices/usersServices.js`: Servicios de de los métodos getUserViews, updateUser y deletUser.

### Endpoint /api/products/:pid

- Endpoint que elimina productos modificado. En caso de que el producto eliminado pertenezca a un usuario premium, le envía un correo indicándole que el producto fue eliminado.

  - <small>Directorio/s de referencia</small>

    - `/src/components/products/index.js`: Rutas de productos.
    - `/src/components/products/productsController/productsController.js`: Controlador del método deleteProduct.
    - `/src/components/products/serviceController/serviceController.js`: Servicios del método deleteProduct.

### Objetivos generales

- Proyecto final completo

### Objetivos específicos

- Vistas necesarias para la realización del flujo completo de compra.
- Experiencia de compra completa.
- Detalles administrativos con los roles de usuarios implementados.

## Enlace al sitio activo

- [Deploy en Render](https://proyecto-final-production-e7eb.up.railway.app/) (Funcionalidad de Front-end limitada!)

## Documentación extra

- [Swagger](https://proyecto-final-production-e7eb.up.railway.app/api-docs/) (En desarrollo.)

## Variables de entorno

| Variable               | Descripción                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `PORT`                 | Puerto de la aplicación. Valores sugeridos: [8080, 3000]      |
| `COOKIE_KEY`           | Nombre de la cookie key.                                      |
| `SECRET_KEY`           | Session secret key.                                           |
| `GITHUB_CLIENT_ID`     | ID de cliente de API de autenticación de Github.              |
| `GITHUB_SECRET_KEY`    | Clave o secreto de API de autenticación de Github.            |
| `GITHUB_CALLBACK_URL`  | URL de devolución de llamada de Github.                       |
| `JWT_SECRET`           | Clave o secreto para JSON Web Token.                          |
| `JWT_EXPIRES_IN`       | Tiempo de expiración para JSON Web Token en segundos.         |
| `JWT_ALGORITHM`        | Algoritmo utilizado para JSON Web Token.                      |
| `NODE_MAILER_USER`     | Usuario de Nodemailer para correo electrónico.                |
| `NODE_MAILER_PASSWORD` | Contraseña de Nodemailer para correo electrónico.             |
| `TWILIO_ACCOUNT_SID`   | SID de cuenta de Twilio.                                      |
| `TWILIO_AUTH_TOKEN`    | Token de autenticación de Twilio.                             |
| `TWILIO_PHONE_NUMBER`  | Número de teléfono de Twilio.                                 |
| `STRIPE_PUBLIC_KEY`    | Clave pública de API de Stripe (gestión de pagos).            |
| `STRIPE_SECRET_KEY`    | Clave o secreto de API de Stripe (gestión de pagos).          |
| `MONGO_URL_LOCAL`      | URL de conexión a MongoDB para entorno local.                 |
| `MONGO_URL_ATLAS`      | URL de conexión a MongoDB para entorno de producción (Atlas). |
| `DB_NAME`              | Nombre de la base de datos en MongoDB.                        |

## Autor del proyecto

- [Lisandro Martínez](https://www.linkedin.com/in/lisandrojm/)

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
