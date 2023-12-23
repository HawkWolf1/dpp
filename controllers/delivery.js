const Delivery = require('../models/delivery');
const Pickup = require('../models/pickup');

const delivery = async (req, res, next) => {
    try {
        const {
            customerName,
            phoneNo,
            movieName,
            rent,
            daysRented,
            deliveryCharge
        } = req.body;
        console.log('zzzzzzzz')
        const userId = req.user.id;
        console.log(userId)

        const newDelivery = await Delivery.create({
            customer: customerName,
            mobile: phoneNo,
            movie: movieName,
            rent,
            daysrented: daysRented,
            deliveryCharge,
            userId 
        });

        res.status(200).json({ message: 'Delivery details added successfully', delivery: newDelivery });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};


const pickupDetails = async (req, res, next) => {
    try {
        const { phoneNo } = req.query;
        let movieDetails;

        if (phoneNo) {
            movieDetails = await Delivery.findAll({
                where: {
                    mobile: phoneNo,
                },
                attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'userId'] },
            });

            if (!movieDetails || movieDetails.length === 0) {
                return res.status(404).json({ message: `No movie details found for phone number ${phoneNo}.` });
            }
        } else {
            movieDetails = await Delivery.findAll({
                attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'userId'] },
            });

            if (!movieDetails || movieDetails.length === 0) {
                return res.status(404).json({ message: 'No movie details found.' });
            }
        }

        res.status(200).json({ message: 'Movie details retrieved successfully', movieDetails });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};



const pickup = async (req, res, next) => {
    try {
        const { phoneNo, selectedMovies } = req.body;

        const userId = req.user.id;
        
        const pickupRecords = await Pickup.bulkCreate(
            selectedMovies.map(movie => ({
                mobile:phoneNo,
                movie,
                userId
            }))
        );

        res.status(200).json({ message: 'Movies confirmed for pickup', pickups: pickupRecords });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};



module.exports = {
    delivery,
    pickupDetails,
    pickup
};
