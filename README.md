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

---

## Configuración del Entorno y Persistencia de datos.

- El servidor se configura utilizando el gestor de comandos Commander para especificar el ambiente de ejecución y el tipo de persistencia.

- Los ejemplos de comandos disponibles son:

  ```bash
  node index.js -m development -p MONGO
  ```

  ```bash
  node index.js -m production -p MEMORY
  ```

  ```bash
  node index.js -m staging -p FILESYSTEM

  ```

- \*Los comandos se pueden combinar.Tanto las diferentes variables de entorno como las distintas capas de persistencia.

# Uso Recomendado

Para un funcionamiento completo del sistema, se recomienda utilizar las variables de entorno en modo "development" junto con la capa de persistencia "MONGO".

```bash
node index.js -m development -p MONGO
```

Es importante tener en cuenta que aunque se ha implementado la inicialización para los entornos "production" y "staging" junto con las capas de persistencia "MEMORY" y "FILESYSTEM", la funcionalidad completa de estos entornos será implementada en futuras actualizaciones.

<small>Directorio/s de referencia</small>

- `/src/config/index.js`: Configuración de la aplicación.
- `/src/dao/factory.js`: Configuración de persistencia.

---

## Enlace al sitio activo

- [Deploy en Render](https://proyecto-final-production-e7eb.up.railway.app/) (Funcionalidad de Front-end limitada!)

## Documentación extra

- [Swagger](https://proyecto-final-production-e7eb.up.railway.app/api-docs/) (En desarrollo.)

## Variables de entorno

| Variable            | Descripción                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `PORT`              | Puerto sobre el cual se levantará el servidor de manera local. Valores sugeridos: [8080, 3000]                              |
| `NODE_ENV`          | Define el entorno del servidor. Valores: [development,production,staging]                                                   |
| `MONGO_URI_PROD`    | URL de conexión a MongoDB para DB de producción.                                                                            |
| `MONGO_URI_DEV`     | URL de conexión a MongoDB para DB de dev/test. Se sugiere local.                                                            |
| `SESSION_SECRET`    | Clave o secreto para session.                                                                                               |
| `JWT_SECRET`        | Clave o secreto para JSON Web Token.                                                                                        |
| `GH_CLIENT_ID`      | ID de cliente de API de autenticación de Github. Se obtiene en la plataforma (ver sección desarrollo de la plataforma).     |
| `GH_CLIENT_SECRET`  | Clave o secreto de API de autenticación de Github. Se obtiene como la anterior.                                             |
| `APP_ID`            | ID de API de autenticación de Github. Se obtiene como las anteriores. No es requerida.                                      |
| `GMAIL_PASS`        | Clave de acceso a mailing de GMAIL. Se obtiene en la plataforma (ver sección desarrollo de la plataforma).                  |
| `GMAIL_USER`        | Dirección de correo electrónico que actuará como remitente.                                                                 |
| `STRIPE_SECRET_KEY` | Clave o secreto de API de Stripe (gestión de págos). Se obtiene en la plataforma (ver sección desarrollo de la plataforma). |

## Autor del proyecto

- [Lisandro Martínez](https://www.linkedin.com/in/lisandrojm/)

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
