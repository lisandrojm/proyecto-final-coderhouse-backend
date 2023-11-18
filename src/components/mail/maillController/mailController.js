/* ************************************************************************** */
/* src/components/mail/mailController/mailController.js -  
/* ************************************************************************** */
/* Funcionalidad: Send Mail  */

const sendMailService = require('../mailServices/mailServices');

class SendMailController {
  sendMail = async (req, res) => {
    const payload = req.body;
    return await sendMailService.sendMail(payload, res);
  };
}

module.exports = new SendMailController();
