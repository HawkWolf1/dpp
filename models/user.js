const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const userTable = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    email: {
        type: Sequelize.STRING,
        unique: true

    }
},{
    schema: 'public', 
    timestamps: true
}
)   

module.exports = userTable