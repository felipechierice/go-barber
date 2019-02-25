const path = require('path');

/**
 * Controller de arquivos de upload
 */
class FileController {
  /**
   * Exibe um arquivo de upload
   * @param {object} req Objeto de requisição do Express
   * @param {object} res Objeto de resposta do Express
   * @return {*} Exibe o arquivo
   */
  show(req, res) {
    const {file} = req.params;
    const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        file
    );
    return res.sendFile(filePath);
  }
}

module.exports = new FileController();
