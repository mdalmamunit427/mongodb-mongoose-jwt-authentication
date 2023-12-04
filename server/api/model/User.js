
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        trim: true,
    },
    jobTitle: String,
    company: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
