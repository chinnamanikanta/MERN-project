const jwt = require('jsonwebtoken');
const User = require('../models/users-schema')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token,'thisismyquizapp');
        const user = await User.findOne({_id:decoded._id, 'tokens.token': token});
        if(!user) {
            throw new Error("Invalid verification")
        }
        req.token = token;
        req.user = user;

        next()
    }
    catch(error) {
        res.status(401).send({error:"please authenticate"})
    }



}

module.exports = auth