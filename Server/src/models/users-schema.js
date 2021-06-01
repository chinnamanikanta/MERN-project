const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const dashboardSchema = new mongoose.Schema({
        courseType:{type:String,default:""},
        score:{type:Number},
        courseStatus:{type:Boolean,default:false}

})


const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
    
        required:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength:7,
         validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
     tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    dashboard:[dashboardSchema],
avatar: {
    type:Buffer
},

aboutStatus: {
    type:String,
    default:""
},

}, {
    timestamps:true
})
userSchema.virtual('tasks', {
    ref:'Task',
    localField: '_id',
    foreignField:'owner'
})


userSchema.statics.findByCredentials = async (email,password) => {
    
    const user = await User.findOne({email});
    

    if(!user) {
        throw new Error("unable to login")
    }


    const isMatch = await bcrypt.compare(password,user.password)
    

    if(!isMatch) {
        throw new Error("unable to match password")
    }
    

    return user
}



userSchema.methods.generateAuthToken = async function() {
    
    const user = this;
    

    const token = jwt.sign({ _id:user._id.toString()}, 'thisismyquizapp')
    
    user.tokens = user.tokens.concat({token})
    await user.save();

    return token;



}

userSchema.pre('save',async function(next){
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)


    }

    next()
})


const User = mongoose.model('User',userSchema);

module.exports = User