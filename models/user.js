const mongoose = require('mongoose');

//creating userSchema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true // will print created at and updated at

});

const User = mongoose.model('User',userSchema);

module.exports = User;