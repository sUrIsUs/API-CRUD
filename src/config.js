require('dotenv').config();

module.exports = {
    app:{
        port: process.env.PORT || 4000,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'secret',
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'Akatsuki974',
        database: process.env.MYSQL_DATABASE || 'tablero',
    }
}