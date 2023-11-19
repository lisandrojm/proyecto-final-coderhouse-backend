# PROYECTO FINAL - Coderhouse/Backend

## Descripción

El objetivo de este proyecto fue aplicar los conocimientos adquiridos durante el curso "Programación Backend" de Coderhouse. Se llevó a cabo la integración de los diferentes desafíos del programa en el desarrollo de una API REST para un e-commerce con las siguientes características:

### Arquitectura SOA (Service-Oriented Architecture)

Se optó por una arquitectura orientada a servicios para organizar eficientemente las diversas funciones del sistema, permitiendo modularidad y escalabilidad.

### Cookies

Utilización del almacenamiento de tokens JWT en cookies, mejorando la seguridad del sistema y facilitando la gestión de sesiones.

### CRUD (Create, Read, Update, Delete)

Se implementó la funcionalidad completa de Crear, Leer, Actualizar y Eliminar (CRUD) para la gestión eficiente de usuarios, productos y carritos.

### Factory

Implementación de la configuración de persistencia utilizando el patrón Factory

### DAO

Interacción directa con la fuente de datos. Proporciona métodos para realizar operaciones CRUD.

### Logger - Winston

Incorporación de Winston para la gestión de logs, mejorando la capacidad de seguimiento y depuración del sistema.

### Mailing - Nodemailer

Implementación de Nodemailer para el envío de correos electrónicos a los usuarios después de determinadas acciones, mejorando la interacción y la comunicación con los clientes.

### Manejo de errores - Customizador de errores

Customizador de errores básico y un diccionario para los errores más comunes al crear un producto, mejorando la experiencia del usuario y facilitando la resolución de problemas.

### Mocking - Faker

Utilización de Faker para la creación de usuarios y productos ficticios con fines de testing, mejorando la capacidad de realizar pruebas en diferentes escenarios.

### Motor de plantillas Handlebars

Implementación de Handlebars como motor de plantillas para la generación dinámica de contenido HTML, mejorando la presentación de la información.

### Pasarela de pago para tarjetas - Stripe

Incorporación de una pasarela de pago segura utilizando Stripe, permitiendo transacciones confiables en la plataforma.

### Passport y session para autenticación de terceros con GitHub

Integración de Passport y session para permitir la autenticación de usuarios a través de GitHub.

### Repository

Actúa como un intermediario entre la capa de servicios y la capa de datos (DAO). Proporciona una interfaz simplificada para que los servicios interactúen con la base de datos sin necesidad de conocer los detalles de implementación de la persistencia.

### Ruteo avanzado - Custom Responses y restricción de parámetros

Ruteo avanzado que incluye respuestas personalizadas y restricciones de parámetros, mejorando la robustez y seguridad del sistema.

### Sistema de autenticación JSON Web Token (JWT)

Establecimiento de un sólido sistema de autenticación mediante JWT, asegurando la identidad de los usuarios a través de tokens firmados digitalmente.

### Sistema de roles y políticas - Handle Policies

Sistema de roles y políticas utilizando Handle Policies para gestionar con precisión los permisos y accesos a diferentes funcionalidades.

### Testing

- Artillery para el testing del flujo de registro y login de usuarios, mejorando la evaluación del rendimiento del sistema.

- Mocha + Chai + Supertest para llevar a cabo pruebas unitarias introductorias para algunas funcionalidades, asegurando la confiabilidad y el rendimiento del sistema.

### Websockets

Se llevó a cabo la incorporación de Websockets en un chat general y en vistas del administrador, proporcionando una comunicación bidireccional en tiempo real.

## Requerimientos específicos de la entrega :

### Router /api/users - rutas

- GET / - Obtiene a todos los usuarios y solo devuelve los datos principales: nombre, correo y tipo de cuenta (role).

  - <small>Directorio/s de referencia</small>

    - `src/components/users/index.js`: Rutas de users.
    - `src/components/users/usersController/usersController.js` : Controlador del método getPrincipalDataUser.
    - `src/components/users/usersServices/usersServices.js`: Servicios del método getPrincipalDataUser.

- DELETE / - Limpia a todos los usuarios que no hayan tenido conexión en los últimos 2 días y le envía un correo al usuario indicándole que su cuenta ha sido eliminada por inactividad. (Puedes hacer pruebas con el último minuto, por ejemplo. Ver código comentado del método **deleteInactiveUsers**).

  - <small>Directorio/s de referencia</small>

    - `src/components/users/index.js`: Rutas de users.
    - `src/components/users/usersController/usersController.js` : Controlador del método deleteInactiveUsers.
    - `src/components/users/usersServices/usersServices.js`: Servicios del método deleteInactiveUsers.

### Views

- ADMIN View - Vista donde se puede visualizar, modificar el role y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerc.

  - <small>Directorio/s de referencia</small>

    - `src/views/layouts/main.handlebars`: Main del motor de plantillas handlebars.
    - `src/views/adminDashboardUsers.handlebars` : Vista del Admin Dashboard de Usuarios.

    - `src/components/handlebars/index.js`: Rutas de views.
    - `src/components/handlebars/handlebarsController/handlebarsController.js` : Controlador del método getAdminDashboardUsers.
    - `src/components/handlebars/handlebarsServices/handlebarsServices.js`: Servicio del método getAdminDashboardUsers.

    - `src/components/users/index.js`: Rutas de users.
    - `src/components/users/usersController/usersController.js` : Controlador de los métodos getUserViews, updateUser y deletUser.
    - `src/components/users/usersServices/usersServices.js`: Servicios de de los métodos getUserViews, updateUser y deletUser.

### Endpoint /api/products/:pid

- Endpoint que elimina productos modificado. En caso de que el producto eliminado pertenezca a un usuario premium, le envía un correo indicándole que el producto fue eliminado.

  - <small>Directorio/s de referencia</small>

    - `src/components/products/index.js`: Rutas de productos.
    - `src/components/products/productsController/productsController.js`: Controlador del método deleteProduct.
    - `src/components/products/serviceController/serviceController.js`: Servicios del método deleteProduct.

## Objetivos específicos de la entrega

- Implementación de las vistas necesarias para la realización del flujo completo de compra.
- Realización de una experiencia de compra completa. - Ver [Video](#video)
- Detalles administrativos con los roles de usuarios implementados.

## Variables de entorno <a name="env"></a>

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

El proyecto cuenta con un archivo llamado .env.example con todas las definiciones de las variables de entorno para ser customizadas. Luego de completar la información se deben guardar tres archivos con los siguientes nombres:

- .env.development (desarrollo)
- .env.production (producción)
- .env.staging

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

\* Los comandos se pueden combinar. Tanto las diferentes variables de entorno como las distintas capas de persistencia.

## Uso Recomendado

Para un funcionamiento completo del sistema, se recomienda utilizar las variables de entorno en modo "development" junto con la capa de persistencia "MONGO".

```bash
node index.js -m development -p MONGO
```

Es importante tener en cuenta que se ha implementado la inicialización para los entornos "production" y "staging" junto con las capas de persistencia "MEMORY" y "FILESYSTEM" con el fin de contar con la estructura para futuras actualizaciones. Su funcionalidad es limitada.

<small>Directorio/s de referencia</small>

- `src/config/index.js`: Configuración de la aplicación.
- `src/dao/factory.js`: Configuración de persistencia.

## Requisitos

Asegúrate de tener los siguientes requisitos instalados en tu entorno de desarrollo:

- Node.js
- MongoDB

## Instrucciones de instalación

Sigue estos pasos para instalar y configurar el proyecto:

- Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/lisandrojm/desafio_cuarta_practica_integradora
```

- Navega al directorio del proyecto:

```bash
cd proyecto_final
```

- Instala las dependencias del proyecto ejecutando el siguiente comando:

```bash
npm install
```

- Configura la conexión a la base de datos MongoDB y todas las variables de entorno. (Ver [Variables de entorno](#env))

```bash
cp .env.example .env
```

Asegúrate de tener MongoDB en ejecución , la URL de conexión correcta y todas las variables de entorno configuradas.

- Inicia la aplicación con el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor Node.js y estará escuchando en el puerto especificado en el archivo `.env`.

- Accede a la aplicación en tu navegador web ingresando la siguiente URL:

```
http://localhost:<PUERTO_DE_LA_APP>
```

Asegúrate de reemplazar `<PUERTO_DE_LA_APP>` con el número de puerto especificado en el archivo `.env`.

- Ahora podrás utilizar la vista de Login en la aplicación.

- Puedes iniciar la aplicación en el entorno de desarrollo con el siguiente comando:

  ```bash
  npm run dev
  ```

## Credenciales de users con roles asignados para testing:<a name="credenciales"></a>

Cuando se inicia el servidor, si no existen en la base de datos, se crearán automáticamente usuarios y productos para realizar testings:

- 15 Productos y un user "owner" de los productos - Creados con Faker.
- 3 Usuarios con los roles "admin", "user" y "premium".

### Credenciales de Admin (role: "admin") creado en la DB al iniciar la app:

#### Email:

```
admin@correo.com
```

#### Password:

```
1111
```

### Credenciales de User (role: "user") creado en la DB al iniciar la app:

#### Email:

```
user@correo.com
```

#### Password:

```
1111
```

### Credenciales de User Premium (role: "premium") creado en la DB al iniciar la app:

#### Email:

```
premium@correo.com
```

#### Password:

```
1111
```

## [STRIPE](https://stripe.com/docs/testing) - Datos ficticios para simular el pago con tarjeta de crédito:

#### Card Number:

```
4242424242424242
```

#### MM/YY :

```
1234
```

#### CVC :

```
567
```

#### ZIP :

```
89123
```

## Testing - Mocha + Chai + Supertest

Realización de módulos de testing para el proyecto principal, utilizando los módulos de mocha, chai y supertest.
Incluye 3 (tres) tests desarrollados para:

- Router de products.
- Router de carts.
- Router de sessions.

<small>Directorio/s de referencia</small>

- `/test/carts.test.js`: Configuración del test de carts.
- `/test/products.test.js`: Configuración del test de products.
- `/test/sessions.test.js`: Configuración del test de sessions.

### Comando para ejecutar el test:

```bash
npm test
```

## Testing - Artillery

- Simulación de registro y logins de usuarios mediante artillery.

<small>Directorio/s de referencia</small>

- `src/components/users/index.js`: Rutas de users.
- `src/components/users/usersController/usersController.js` : Controlador del método createFakeUser.
- `src/components/users/usersServices/usersServices.js`: Servicios del método createFakeUser.

- `config.yaml`: Instrucciones de testing de nuestro respectivo flujo de performance con artillery.

- `restPerformance.json`: Archivo donde se guardan los resultados del test en formato json.

### Comando para ejecutar el test con Artillery:

```bash
npx artillery run config.yaml --output restPerformance.jsonnpm test
```

### Estructura general del proyecto

Aquí tienes la estructura del proyecto con descripciones para cada directorio:

El proyecto sigue la siguiente estructura de directorios:

- `.env.example`: Archivo de ejemplo que muestra la estructura y variables de entorno requeridas para la configuración de la aplicación.

- `src/components`: Carpeta contenedora de todos los componentes. Cada componente contiene un archivo index.js con sus rutas, una carpeta de controlador y una de servicios.

- `src/config`: Configuración de la aplicación.

- `src/dao`: Configuración de persistencia de datos.

- `src/docs`: Documentación.

- `src/models`: Modelos de datos de la aplicación.

- `src/public`: Archivos públicos de la aplicación, como estilos CSS, imágenes y scripts JavaScript.

- `src/repositories`: Capas de acceso de datos.

- `src/routes`: Definición de rutas de la aplicación.

- `src/scripts`: Scripts.

- `src/uploads`: Repositorios de archivos subidos.

- `src/utils`: Archivos relacionados con la configuración de las utilidades reutilizables.

- `src/views`: Todas las vistas del proyecto.

- `src/test`: Test de funcionalidades.

- `src/index.js`: Punto de entrada principal para la ejecución de la aplicación.

- `src/errors.log`: Registro de errores.

## Dependencias

El proyecto utiliza las siguientes dependencias:

- **Express.js (v4.18.2):** Framework de Node.js para construir aplicaciones web.
- **UUID (v9.0.0):** Biblioteca para generar identificadores únicos.
- **Cors (v2.8.5):** Middleware para permitir peticiones HTTP entre diferentes dominios.
- **Dotenv (v16.3.1):** Carga variables de entorno desde un archivo .env.
- **Express-handlebars (v7.0.7):** Motor de plantillas para Express.js.
- **MongoDB (v5.6.0):** Driver de MongoDB para Node.js.
- **Mongoose (v7.3.1):** Modelado de objetos de MongoDB para Node.js.
- **Multer (v1.4.5-lts.1):** Middleware para manejar datos de formulario multipart/form-data.
- **Socket.io (v4.6.2):** Biblioteca para la comunicación en tiempo real basada en WebSockets.
- **Sweetalert2 (v11.7.12):** Biblioteca para mostrar mensajes y alertas personalizadas.
- **Connect-mongo (v5.0.0):** Middleware para almacenar sesiones de Express.js en MongoDB.
- **Cookie-parser (v1.4.6):** Middleware para analizar cookies en las solicitudes de Express.js.
- **Express-session (v1.17.3):** Middleware para manejar sesiones en Express.js.
- **Mongoose-paginate-v2 (v1.7.1):** Plugin de paginación para Mongoose.
- **Bcrypt (v5.1.0):** Biblioteca para el hashing seguro de contraseñas.
- **Passport (v0.6.0):** Middleware para autenticación en Node.js.
- **Passport-github2 (v0.1.12):** Estrategia de autenticación para Passport usando OAuth 2.0 con GitHub.
- **Passport-local (v1.0.0):** Estrategia de autenticación para Passport basada en credenciales locales.
- **Jsonwebtoken (v9.0.1):** Biblioteca para generar y verificar tokens JWT.
- **Passport-jwt (v4.0.1):** Estrategia de autenticación para Passport que utiliza tokens JWT (JSON Web Tokens) para la autenticación de usuarios.
- **Commander (v11.0.0):** Biblioteca para crear interfaces de línea de comandos interactivas en Node.js.
- **Twilio (v4.16.0):** Biblioteca para enviar y recibir mensajes de texto y realizar llamadas telefónicas a través de la API de Twilio.
- **Nodemailer (v6.9.4):** Biblioteca para enviar correos electrónicos desde una aplicación Node.js.
- **Faker (v5.5.3):** Biblioteca para generar datos falsos como nombres, direcciones, correos electrónicos, etc., útil para pruebas y desarrollo.
- **@hapi/boom (v10.0.1):** Biblioteca para manejar errores HTTP de una manera más consistente y amigable.
- **winston (v3.10.0):** Biblioteca para el registro de registros (logs) en Node.js.
- **Swagger-jsdoc (v6.2.8):** Biblioteca para generar documentación de API utilizando comentarios en el código fuente.
- **Swagger-ui-express (v5.0.0):** Biblioteca para renderizar la documentación de Swagger de forma interactiva en una aplicación Express..

## DevDependencies

El proyecto utiliza las siguientes devDependencies:

- Nodemon (v2.0.22): Utilidad que monitoriza cambios en los archivos y reinicia automáticamente la aplicación.

Estas dependencias pueden ser instaladas ejecutando el comando `npm install` en el directorio del proyecto.

## Postman Collections

- En la carpeta `postman_collections`, encontrarás el archivo necesario `proyecto_final.postman_collection.json` para importar la colección `proyecto_final` en Postman y realizar pruebas en el proyecto. Los métodos que lo requieren proporcionan ejemplos de solicitudes HTTP para interactuar con la API y probar su funcionalidad.

- Importante: Como el proyecto cuenta con un Middleware de autorización se deben realizar los siguientes pasos en Postman para tener acceso a los endpoints:

  - Ir a la colección proyecto_final/components/auth/login e ingresar las credenciales que correspondan de acuerdo al role que necesitas para acceder al endpoint (Ver [Credenciales de users con roles asignados para Testings.](#credenciales))

  - Copiar el token obtenido

  - Ir a Postman/Headers/Cookies/Manage Cookies.

    - Add domain.

    - Type a domain name: localhost.

    - Add Cookie : Cambiar Cookie_1=value por jwt=value (debido a que el nombre de la cookie es jwt).

    - Debe quedar un código como el siguiente (el token a continuación es un ejemplo) : jwt=ey123456789wolrtjlwkjt.eyJfaWQiOiI2NGY3YzBkY2ZmMzY2NmQ4YTdjMDA0MDciLCJlbWFpbCI6InVzZXJAY29ycmVvLmNvbSIsInJvbGUiOiJhZG1pbiIsImZpcnN0X25hbWUiOiJ1c2VyIiwibGFzdF9uYW1lIjoidXNlciIsImFnZSI6MzMsImNhcnQiOiI2NGY3YzBkY2ZmMzY2NmQ4YTdjMDA0MDkiLCJpYXQiOjE2OTQwNTU5OTgsImV4cCI6MTY5NDE0MjM5OH0.hIYn2frVQCVNBMGI5E4sRkTqCTBhSHQ0Th0uSOUtabc; Path=/; Expires=Fri, 06 Sep 2024 03:12:07 GMT;

  - Ten en cuenta que los tokens de las cookies expiran por lo que para realizar varios tests debes volver a loguearte y copiar y pegar el token en la cookie de Postman.

## Video - Experiencia completa de compra<a name="video"></a>

https://github.com/lisandrojm/proyecto_final/assets/35199683/02060eff-54bf-42f6-9f4e-0f102455607d

## Enlace al sitio activo

- [Deploy en Render](https://proyecto-final-production-e7eb.up.railway.app/) (Funcionalidad Front-end básica)

## Documentación extra

- [Swagger](https://proyecto-final-production-e7eb.up.railway.app/api-docs/) (Implementación básica de métodos relevantes del proyecto)

## Autor del proyecto

- [Lisandro Martínez](https://www.linkedin.com/in/lisandrojm/)

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
