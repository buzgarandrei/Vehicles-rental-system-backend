const express = require('express');

const router = express.Router();
const Shop = require('../routes/models/Shop');
const Vehicle = require('./models/Vehicle');
const Price = require('./models/Price');
const { $where } = require('./models/Price');

router.post('/', (req, res) => {
    console.log(req.body);
    const shop = new Shop({
        name: req.body.name,
        address: req.body.address,
        owner: req.body.owner
    });
    shop.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
}); 

router.get('/', async (req, res) => {
    try{
        const users = await Shop.find();
        res.json(users);
    }
    catch(err) {
        res.status(400).json({message: err});
    }
});

router.get('/:id', async(req, res) => {
    try{
        const users = await Shop.findById(req.params.id);
        res.json(users);
    }
    catch(err) {
        res.status(400).json({message: err});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const removedShop = await Shop.remove({ _id: req.params.id });
        res.json(removedShop);
    }
    catch(err) {
        res.status(400).json({message: err});
    }
});

router.patch('/', async (req, res) => {
    try{
        const updatedShop = await Shop.update({_id: req.body._id }, {$set: req.body});
        console.log(updatedShop);
        res.json(updatedShop);
    }
    catch(err) {
        res.status(400).json({message: err});
    }
});

router.patch('/addVehicle', async (req, res) => {
    try{
        const vehicle = await Vehicle.findById(req.body.idVehicle);
        const updatedShop = await Shop.update({_id: req.body.idShop }, {$push: {vehicleList: vehicle}});
        console.log(updatedShop);
        res.json(updatedShop);
    }
    catch(err) {
        res.status(400).json({message: err});
    }
});

router.get('/getVehicleList/:id', async (req, res) => {
    try{
        const vehicles = (await Shop.findById(req.params.id)).vehicleList;
        let realVehicles = [];
        for( let id of vehicles) {
            let vehicle = await Vehicle.findById(id);
            let vehicle2 = vehicle;
            realVehicles.push(vehicle2);

        }
        res.json(realVehicles);
    }
    catch(err) {
        res.status(400).json({message: err});
    }
});

function getNrOfDaysBetween(day1, day2) {
    return (((day2.getTime() - day1.getTime()) / (1000 * 3600 * 24)) + 1);
}
router.post('/search', async (req, res)=> {
    //const prices = Price.find( {$where: 'this.startDate <= '} )
    try {
        let startDate = new Date(req.body.startDate);
        let endDate = new Date(req.body.endDate);
        let list = [];
        const vehicleIDs = (await Shop.findById(req.body.idShop)).vehicleList;
        for(let idVehicle of vehicleIDs) {
            let priceIDsAwait = (await Vehicle.findById(idVehicle)).prices;
            priceIds = priceIDsAwait;
            let pricesOfAVehicle = [];
            for( let idPrice of priceIds) {
                let price;
                try{
                    let priceAwait = await Price.findById(idPrice);
                    price = priceAwait;
                }catch(err) {
                    console.log(err);
                }

                pricesOfAVehicle.push(price);
            }
            let amount = 0;
            for( let priceFromDB of pricesOfAVehicle) {
                if( (priceFromDB.startDate <= startDate && priceFromDB.endDate >= startDate) || 
                    (priceFromDB.startDate <= endDate && priceFromDB.endDate >= endDate) ) {
                        if(priceFromDB.startDate <= startDate ) {
                            amount = amount + (getNrOfDaysBetween(startDate, priceFromDB.endDate) * priceFromDB.amount);
                            //list.push(priceFromDB);
                        }
                        if(priceFromDB.endDate <= endDate) {
                            amount = amount + (getNrOfDaysBetween(priceFromDB.startDate, endDate) * priceFromDB.amount);
                            //list.push(priceFromDB);
                        }
                    }

                if((priceFromDB.startDate >= startDate && priceFromDB.endDate <= endDate) )
                    {
                        amount = amount + (getNrOfDaysBetween(priceFromDB.startDate, priceFromDB.endDate) * priceFromDB.amount);
                        //list.push(priceFromDB);
                    }
            }
            console.log(amount);
            let object = { amount: amount, idVehicle: idVehicle};
            console.log(object);
            list.push(object);
        }
        res.send(list);
        
    } catch (error) {
        res.status(400).json(res);
    }
})

module.exports = router;