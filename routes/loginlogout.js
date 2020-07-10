const express = require('express');
const User = require('./models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const foundUser = await User.findOne({email: req.body.email, password: req.body.password});
        console.log(foundUser);
        let user = req.session;
        user._id = foundUser._id;
        user.email = foundUser.email;
        user.role = foundUser.role;
        console.log(req.session);
        res.send(user);
    }
    catch(err) {
        res.status(400).json({message: err});
    }

});

router.get('/logout', (req, res) => {
    req.session.destroy( ()=> {
       console.log("user logged out.")
    });
 });

module.exports = router;



