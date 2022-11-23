import { DataTypes } from 'sequelize'

const Books = (sequelize) => {
    const Schema = {

        name: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        author: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.STRING, //= TEXT
            allowNull: true
        }
    }

    return sequelize.define('books', Schema)
}

export default Books