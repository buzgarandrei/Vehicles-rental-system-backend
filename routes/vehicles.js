const express = require('express');
const router = express.Router();
const Vehicle = require('../routes/models/Vehicle');
const Price = require('./models/Price');

router.get('/:id', async(req, res) => {
    try{
        const requestedVehicle = await Vehicle.findById(req.params.id);
        res.json(requestedVehicle);
    }
    catch{error} {
        res.status(400).json({message: error});
    }
});

router.get('/', async(req, res)=> {
    try{
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    }
    catch(error) {
        res.status(400).json({message: error});
    }
});

router.post('/', (req, res) => {
    const vehicle = new Vehicle({
        name: req.body.name,
        description: req.body.description,
        pictureLink: req.body.pictureLink,
        available: req.body.available,
        autonomy: req.body.autonomy,
        type: req.body.type
    });
    console.log(vehicle);
    vehicle.save()
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

router.patch('/', async (req, res) => {
    try{
        const updatedVehicle = await Vehicle.update({_id: req.body._id}, {$set: req.body});
        console.log(updatedVehicle);
        res.json(updatedVehicle);
    }
    catch(err) {
        res.status(400).json(err);
    }

});

router.patch('/addPrice', async (req, res) => {
    try{
        const price = new Price({
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            amount : req.body.amount
        });
        price.save().
        then(data => {
            console.log(data);
        })
        .catch(err => {
            res.json(err);
        });
        const updatedVehicle = await Vehicle.update({_id: req.body.idVehicle}, {$push: {prices: price._id}});
        console.log(updatedVehicle);
        res.json(updatedVehicle);
    }
    catch(err) {
        res.status(400).json(err);
    }
});

router.get('/getPrices/:id', async(req, res) => {
    try{
        console.log(req.session);
        const priceList = (await Vehicle.findById(req.params.id)).prices;
        let prices = [];
        for( let id of priceList) {
            let priceAwait = await Price.findById(id);
            let price = priceAwait;
            prices.push(price);
        }
        res.json(prices);
    }
    catch(err) {
        res.status(400).json({message: err});
    }

})

router.delete('/:id', async (req, res) => {
    try{
        const deletedVehicle = await Vehicle.remove({ _id: req.params.id });
        res.json(deletedVehicle);
    }
    catch(err) {
        res.json({message: err});
    }
});

module.exports = router;