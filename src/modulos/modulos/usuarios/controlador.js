const autenticacion = require('../auth');
const tabla  = 'usuarios'

module.exports = function(databaseInyectada){

    let database = databaseInyectada;

    if(!database){
        database = require('../../../database/mysql');
    }

    function all(){
        return database.all(tabla);
    }
    
    function get(id){
        return database.get(tabla, id);
    }
    
    async function add(data){
        const usuario = {
            id : data.id,
            nombre: data.nombre,
            usuario: data.usuario,
        }

        const respuesta = await database.add(tabla, usuario);

        var insertId = 0;

        if(data.id == 0){
            insertId = respuesta.insertId;
        }
        else{
            insertId = data.id;
        }

        var respuesta2 = '';
        if(data.usuario || data.contraseña){
            respuesta2 = await autenticacion.add({
                id: insertId,
                usuario: data.usuario,
                contraseña: data.contraseña,
            });
        }

        return true;
    }
    
    function put (id){
        return database.put (tabla, id);
    }

    return {
        all,
        get,
        put,
        add,
    }
}