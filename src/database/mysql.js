const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: process.env.DB_PORT || 3306,
}

let connection;

function connectionSql(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((error)=>{
        if(error){
            console.log('Error al conectar con la base de datos');
            setTimeout(connectionSql, 2000);
        }
        else{
            console.log('Conectado a la base de datos');
        }
    });

    connection.on('error', error =>{
        if(error.code === 'PROTOCOL_CONECTION_LOST'){
            connectionSql();
        }
        else{
            throw error;
        }
    })
}

connectionSql();

function all(tabla){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla}`, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function get(tabla, id){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT *FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function add(tabla, data){
    return new Promise((resolve, reject) =>{
        connection.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (error, result) => {
            return error ? reject(error) : resolve(result)
        });
    });
}

function put(tabla, id){
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function query(tabla, consulta){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE ?` , consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    });
}

module.exports = {
    all,
    get,
    add,
    put,
    query,
}