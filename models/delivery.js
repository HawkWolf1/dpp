const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const deliveryTable = sequelize.define('delivery', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    customer: {
        type: Sequelize.STRING,

    },
    mobile: {
        type: Sequelize.STRING,

    },
    movie: {
        type: Sequelize.STRING,

    },
    rent: {
        type: Sequelize.INTEGER,

    },
    daysrented: {
        type: Sequelize.INTEGER,

    },
    deliveryCharge: {
        type: Sequelize.INTEGER,

    },
    
},{
    schema: 'public', 
    timestamps: true
}
)   

module.exports = deliveryTable