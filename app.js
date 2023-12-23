const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express() 


const userRoutes = require('./Routes/user')

app.use(cors()) 

app.use(bodyParser.json({extended: false})) 
app.use(userRoutes) 


const sequelize = require('./util/database')

const myTable = require('./models/user')
const deliveryTable = require('./models/delivery')
const pickupTable = require('./models/pickup')

myTable.hasMany(deliveryTable) 
deliveryTable.belongsTo(myTable) 

myTable.hasMany(pickupTable) 
pickupTable.belongsTo(myTable) 

sequelize.sync().then(() => {
    app.listen(4000)
    console.log('System running')
})
.catch((err) => console.log(err))

