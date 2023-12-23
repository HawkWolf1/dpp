const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticate = async (req,res,next) => {

    try {
        const token = req.header('Authorization')
        console.log(token)
        const user = jwt.verify(token, 'Rockettt')
        console.log(user.id)
        const newUser = await User.findByPk(user.id)
        console.log('qaqaqaqa')
            console.log(JSON.stringify(newUser))

            req.user = newUser 
            next() 
        }catch(err) {
        console.log(err)
        return res.status(401).json({success:false})
    }
}

module.exports = {
    authenticate
}