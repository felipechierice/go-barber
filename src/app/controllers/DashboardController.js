const {User} = require('../models');

/** Controller da página Dashboard */
class DashboardController {
  /**
   * Renderiza a página de dashboard
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   */
  async index(req, res) {
    const providers = await User.findAll({where: {provider: true}});
    return res.render('dashboard', {providers});
  }
}

module.exports = new DashboardController();
