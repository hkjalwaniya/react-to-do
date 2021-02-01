import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationCode: {
        code: Number,
        count: Number,
        date: Date
    }
})

const User = mongoose.model('User', userSchema);
export default User;
