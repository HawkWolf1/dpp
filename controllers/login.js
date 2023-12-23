const myTable = require('../models/user');

const jwt = require('jsonwebtoken')


function generateAccessToken(id) {
    return jwt.sign({ id: id }, 'Rockettt'); 
}

const addUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        const [user, created] = await myTable.findOrCreate({
            where: { email: email },
            defaults: { email: email }
        });

        const token = generateAccessToken(user.id);
        console.log(token)

        if (created) {
            console.log('New User created successfully.');
            res.status(201).json({ message: 'New User created successfully!', token: token });
        } else {
            console.log('User signed in successfully.');
            res.status(200).json({ message: 'User signed in successfully.', token: token });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    addUser
};



