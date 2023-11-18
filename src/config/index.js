/* ************************************************************************** */
/* src/config/index.js - configuración de variables de entorno */
/* ************************************************************************** */

const { program } = require('commander');
const dotenv = require('dotenv');
const { devLogger, stageLogger, prodLogger } = require('../utils/logger/logger');

program.version('1.0.0').description('Programa para levantar nuestro servidor con un ambiente especifico').option('-m, --mode <mode>', 'Ambiente de ejecución', 'development').option('-p, --persistence <persistence>', 'Tipo de persistencia', 'MONGO').parse();

const args = program.opts();

let envFilePath = '';

if (args.mode === 'production') {
  envFilePath = './.env.production';
  prodLogger.info('→ Iniciando entorno Production');
} else if (args.mode === 'staging') {
  envFilePath = './.env.staging';
  stageLogger.info('→ Iniciando entorno Staging');
} else if (args.mode === 'staging') {
} else {
  envFilePath = './.env.development';
  devLogger.info('→ Iniciando entorno Development');
}

dotenv.config({
  path: envFilePath,
});

const config = {
  /* Puerto de la aplicación */
  port: process.env.PORT,

  /* Nombre de la cookie key */
  cookie_key: process.env.COOKIE_KEY,

  /* Session secret key */
  secret_key: process.env.SECRET_KEY,

  /* GitHub */
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_secret_key: process.env.GITHUB_SECRET_KEY,
  github_callback_url: process.env.GITHUB_CALLBACK_URL,

  /* JWT */
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires: process.env.JWT_EXPIRES_IN,
  jwt_algorithm: process.env.JWT_ALGORITHM,

  /* Nodemailer */
  nodemailer_user: process.env.NODE_MAILER_USER,
  nodemailer_pass: process.env.NODE_MAILER_PASSWORD,

  /* Twilio */
  twilio_sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,

  /* Stripe */
  stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};

/*  MongoDB  */
const db = {
  mongo_local: process.env.MONGO_URL_LOCAL,
  mongo_atlas: process.env.MONGO_URL_ATLAS,
  dbName: process.env.DB_NAME,
};

module.exports = {
  args,
  config,
  db,
  persistence: args.persistence,
};
