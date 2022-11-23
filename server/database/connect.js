import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import { Users } from '../model/index.js'

const database = {}
const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bitfinal'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql' })

    database.Users = Users(sequelize)


    // database.Orders.hasOne(database.Ratings)
    // database.Ratings.belongsTo(database.Orders)

    await sequelize.sync({ alter: true })
} catch (error) {
    console.log(error)
    console.log('cant connect database');
}

export default database