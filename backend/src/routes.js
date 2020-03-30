const express = require('express');
const routes = express.Router();

const ongController = require('./controllers/OngsController');
const casoController = require('./controllers/CasoController');
const profileController = require('./controllers/PerfilOngController');
const sessionController = require('./controllers/SessionController');

// ------------- LOGIN -----------------
routes.post('/sessions', sessionController.create);

// -------------- ONGS ------------------
// Listando todas as ongs
routes.get('/ongs', ongController.listAll);
// Cadastrando nova ONG
routes.post('/ongs', ongController.create);
// Exibindo uma ONG especificamente
routes.get('/ongs/:id', ongController.listOng);
// Deletando uma ONG especificamente
routes.delete('/ongs/:id', ongController.delete);

// -------------- PERFIL DA ONG -------------------
// Perfil da ong exibe todos os casos da ONG logada
routes.get('/profile/:id', profileController.listAllCasosFromONG);

// ---------------- CASOS -------------------------
// Listando todos os casos
routes.get('/casos', casoController.listAll);
// Cadastrando novo CASO
routes.post('/casos', casoController.create);
// Exibindo um CASO especificamente
routes.get('/casos/:id', casoController.listCaso);
// Deletando um CASO
routes.delete('/casos/:id', casoController.delete);





module.exports = routes;