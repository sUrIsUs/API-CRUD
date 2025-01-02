const express = require('express');
const config = require('./config');
const morgan = require('morgan');

const mensajes = require('./modulos\\modulos/mensajes/rutas');
const usuarios = require('./modulos\\modulos/usuarios/rutas');
const auth = require('./modulos\\modulos/auth/rutas');

const error = require('./red/errors');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuración del puerto
app.set('port', config.app.port);

app.use('/api/usuarios',usuarios);
app.use('/api/mensajes', mensajes);
app.use('/api/auth', auth);
app.use(error);

module.exports = app;