const express = require('express');
const router = express.Router();
const User = require('../routes/models/User');

router.get('/', async (req, res) => {
    try{
        const posts = await User.find();
        res.json(posts);
    }
    catch(err) {
        res.status(400).json({message: err});
    }

});

router.get('/:id', async(req, res) => {
    console.log(req.session);
    try{
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch(err) {
        res.status(400).json({message: err});
    }

});

router.delete('/:id', async (req, res) => {
    try{
        const removedUser = await User.remove({ _id: req.params.id });
        res.json(removedUser);
    }
    catch(err) {
        res.status(400).json({message: err});
    }

});

router.patch('/', async (req, res) => {
    try{
        const updatedUser = await User.update({_id: req.body._id }, {$set: req.body});
        console.log(updatedUser);
        res.json(updatedUser);
    }
    catch(err) {
        res.status(400).json({message: err});
    }

});

router.post('/', async (req, res) => {
    console.log(req.body);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    console.log(user.firstName);
    user.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;