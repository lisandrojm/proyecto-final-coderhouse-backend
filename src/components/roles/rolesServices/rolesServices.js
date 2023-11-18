/* ************************************************************************** */
/* src/components/roles/rolesServices/rolesServices.js - servicio de roles. */
/* ************************************************************************** */
/* Funcionalidad: Testing de Roles */

class RolesServices {
  getAdmin = async (req, res) => {
    try {
      res.sendSuccess('Si estas viendo esto es porque eres role Admin registrado');
    } catch (error) {
      return res.sendServerError('Error en getAdmin al procesar la solicitud');
    }
  };

  getPremium = async (req, res) => {
    try {
      res.sendSuccess('Si estas viendo esto es porque eres role Premium registrado');
    } catch (error) {
      return res.sendServerError('Error en getPremium al procesar la solicitud');
    }
  };

  getUser = async (req, res) => {
    try {
      res.sendSuccess('Si estas viendo esto es porque eres role User registrado');
    } catch (error) {
      return res.sendServerError('Error en getUser al procesar la solicitud');
    }
  };
}

module.exports = new RolesServices();
