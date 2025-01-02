const respuesta = require('./respuestas');

function errors(error, req, res, next){
    console.error('[error]', error);
    
    const message = error.message || 'Error interno';
    const status = error.statusCode || 500;

    respuesta.error(req, res, message, status);
}

module.exports = errors;