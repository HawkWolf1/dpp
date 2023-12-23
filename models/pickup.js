const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const pickupTable = sequelize.define('pickup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mobile: {
        type: Sequelize.STRING,

    },
    movie: {
        type: Sequelize.STRING,

    }
    
},{
    schema: 'public', 
    timestamps: true
}
)   

module.exports = pickupTable