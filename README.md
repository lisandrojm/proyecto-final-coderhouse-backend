# proyecto_final

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

- [Swagger](https://proyecto-final-production-e7eb.up.railway.app/api-docs//) (En desarrollo.)

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
