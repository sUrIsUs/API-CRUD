const tabla  = 'autenticacion';
const bcrypt = require('bcrypt');
const auth = require('../../../auth');

module.exports = function(databaseInyectada){

    let database = databaseInyectada;

    if(!database){
        database = require('../../../database/mysql');
    }
    
    async function login(usuario, password){
        const data = await database.query(tabla, {usuario: usuario});

        return bcrypt.compare(password, data.contraseña)
            .then(resultado => {
                if(resultado === true){
                    return auth.asignarToken({...data});
                }
                else{
                    throw new Error('Información inválida');
                }
            })
    }

    async function add(data){
        const authData = {
            id : data.id,
        }

        if(data.usuario){
            authData.usuario = data.usuario;
        }

        if(data.contraseña){
            authData.contraseña = await bcrypt.hash(data.contraseña.toString(), 5);
        }

        return database.add(tabla, authData);
    }

    return {
        login,
        add,
    }
}