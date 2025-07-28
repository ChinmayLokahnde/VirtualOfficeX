const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.register = async (req, res )=>{
    try{
        const {username, email, password, avatarUrl} = req.boy;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg:"user already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({username, email, password: hashedPassword, avatarUrl});
        await user.save();
    }  
}