/* ************************************************************************** */
/* src/components/sms/smsController/smsController.js -  
/* ************************************************************************** */
/* Funcionalidad: Send Sms (No requerido. Componente a implementar)  */

const sendSmsServices = require('../smsServices/smsServices');

class SendSmsController {
  sendSms = async (req, res) => {
    const payload = req.body;
    return await sendSmsServices.sendSms(payload, res);
  };
}

module.exports = new SendSmsController();
