const express = require('express');
const applyEndpoints = require('./endpoints');
const applyMiddlewares = require('./middlewares');

const createExpressServer = async app => {
	const server = express();
	applyMiddlewares(server, app);
	applyEndpoints(server, app);

	await app.db.initDB();
	await app.db.populateDB(); // Lo he metido aquí para que se añadan los datos al iniciar la app ya que es sqlite en memoria, pero lo sacaría a un archivo seed.js.

	server.get('/', async (req, res) => {
		if (process.env.NODE_ENV === 'develop') {
			res.send('Test Enviroment');
		} else {
			res.sendStatus(200);
		}
	});

	return server;
};

module.exports = createExpressServer;