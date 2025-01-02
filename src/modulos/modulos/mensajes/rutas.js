const express = require('express');

const respuesta = require('../../../red/respuestas');
const controlador = require('./index');
const router = express.Router();

router.get('/', all);
router.get('/:id', get);
router.put('/', put);
router.post('/',add);

async function all(req, res) {
    const items = await controlador.all();
    respuesta.success(req, res, items, 200);
}

async function get(req, res, next)  {
    try{
        const items = await controlador.get(req.params.id);
        respuesta.success(req, res, items, 200);
    }
    catch(error){
        next(error);
    }
    
};

async function add(req, res, next){
   try{
        const items = await controlador.add(req.body);
        if(req.body.id == 0){
            mensaje = 'Item creado satisfactoriamente';
        }
        else{
            mensaje = 'Item actualizado satisfactoriamente';
        }
        respuesta.success(req, res, mensaje, 201);
   }
   catch(error){
       next(error);
   } 
}

async function put(req, res, next) {
    try{
        const items = await controlador.put(req.body.id);
        respuesta.success(req, res, 'item eliminado sats', 200);
    }
    catch(error){
        next(error);
    }
}


module.exports = router;