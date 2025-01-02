const tabla  = 'mensajes'

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
    
    function add(data){
        return database.add(tabla, data);
    }
    
    function put(id){
        return database.put(tabla, id);
    }

    return {
        all,
        get,
        put,
        add,
    }
}