const {User} = require('../models');
const {Appointment} = require('../models');

/**
 * Controller de agendamentos
 */
class AppointmentController {
  /**
   * Renderiza a página de agendamentos
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   */
  async create(req, res) {
    const provider = await User.findByPk(req.params.provider);
    return res.render('appointments/create', {provider});
  }

  /**
   * Cria um agendamento
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   */
  async store(req, res) {
    const {id} = req.session.user;
    const {provider} = req.params;
    const {date} = req.body;

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date,
    });

    return res.redirect('/app/dashboard');
  }
}

module.exports = new AppointmentController();
