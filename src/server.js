const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const nunjucks = require('nunjucks');
const path = require('path');
const routes = require('./routes');

const redisConfig = require('./config/redis');

/** Classe principal da aplicação */
class App {
  /** Instancia a aplicação */
  constructor() {
    /**
     * express Instância do express
     * @type {object}
     * @private
     */
    this.express = express();
    /**
     * isDev Variável ambiente para identificar ambiente
     * @type {boolean}
     * @private
     */
    this.isDev = process.env.NODE_ENV !== 'production';

    this.middlewares();
    this.views();
    this.routes();
  }

  /**
   * Aplica middlewares na aplicação
   */
  middlewares() {
    this.express.use(express.urlencoded({extended: false}));
    this.express.use(flash());
    this.express.use(
        session({
          secret: 'MyAppSecret',
          resave: true,
          saveUninitialized: true,
          store: new RedisStore(redisConfig),
        })
    );
  }

  /**
   * Configura views do Nunjucks
   */
  views() {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true,
    });

    this.express.use(express.static(path.resolve(__dirname, 'public')));
    this.express.set('view engine', 'njk');
  }

  /**
   * Aplica rotas da aplicação
   */
  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
