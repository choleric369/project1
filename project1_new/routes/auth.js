const router = require('express').Router();
const User = require('../models/Users');
const {registerValidation, loginValidation}= require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res)=> {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const nameExist = await User.findOne({name: req.body.name});
    if(nameExist) return res.status(400).send('This name is already taken');

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
    });
    user.save();
    res.send('Details are valid!, Registered');
});

router.post('/login', async (req,res) =>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({name: req.body.name});
    if(!user) return res.status(400).send('Invalid name');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id: user._id}, "sadhfnfvbc");
    res.header('auth-token', token).send(token);
    //res.send("logged in successfully");
});
module.exports = router;