const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    DOB: {type: Date, required: true},
    Sex: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdat: {type: Date, default: Date.now}
})

userSchema.pre("save", function (next){
    bcrypt.hash(this.password, 10).then((hashed)=>{
        this.password = hashed
        console.log(hashed);

        next()
    }).catch((err)=>{
        console.log(err);
    })
})

let userModel = mongoose.model("Workspace", userSchema)

module.exports = userModel