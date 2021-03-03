'use strict';

const Autoload = require('fastify-autoload');
const S = require('fluent-json-schema');

const { join } = require('path');

module.exports = async function (app, opts) {
  app.register(require('fastify-env'), {
    confKey: 'config',
    schema: S.object().prop('NODE_ENV', S.string().default('development')),
    dotenv: true,
  });

  app.register(require('fastify-sensible'));

  app.register(Autoload, {
    dir: join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  app.get('/', async function (request, reply) {
    return { hello: 'world' };
  });
};
