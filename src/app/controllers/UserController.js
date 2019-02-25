const {User} = require('../models');

/** Controller de Usuários */
class UserController {
  /**
   * Renderiza view de Usuario
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   * @return {*} Renderização da view
   */
  create(req, res) {
    return res.render('auth/signup');
  }

  /**
   * Cria um usuário
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   * @return {*} Redirecionamento
   */
  async store(req, res) {
    const {filename: avatar} = req.file;
    await User.create({...req.body, avatar});
    return res.redirect('/');
  }
}

module.exports = new UserController();
