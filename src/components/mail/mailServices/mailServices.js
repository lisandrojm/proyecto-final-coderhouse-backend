/* ************************************************************************** */
/* src/components/mail/mailServices/mailServices.js -  
/* ************************************************************************** */
/* Funcionalidad: Send Mail  */

const MailManager = require('../../../utils/mailManager/mailManager');

class SendMailServices {
  async sendMail(payload, res) {
    try {
      const data = await MailManager.sendEmail(payload);
      return res.sendSuccess({
        payload: {
          message: 'Mail enviado correctamente',
          data,
        },
      });
    } catch (error) {
      return res.sendServerError('Error al enviar Mail');
    }
  }
}

module.exports = new SendMailServices();
