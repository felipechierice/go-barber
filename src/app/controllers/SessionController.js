const {User} = require('../models');

/** Controller de Sessão */
class SessionController {
  /**
   * Renderiza view de Sessão (login)
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   * @return {*} Renderização da view
   */
  async create(req, res) {
    return res.render('auth/signin');
  }

  /**
   * Destrói a sessão
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   */
  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie('root');
      return res.redirect('/');
    });
  }

  /**
   * Cria uma sessão
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   * @return {*} Redirecionamento
   */
  async store(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});

    if (!user) {
      req.flash('error', 'Usuário não encontrado.');
      console.log('no');
      return res.redirect('/');
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta.');
      console.log('noo');
      return res.redirect('/');
    }

    req.session.user = user;

    return res.redirect('/app/dashboard');
  }
}

module.exports = new SessionController();
