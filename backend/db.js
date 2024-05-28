const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://koushubhyadav:iTRP4WTvL6m3AzD5@cluster0.folad0s.mongodb.net/task");

//user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});


// create model from schema
const User = mongoose.model("User", userSchema);

module.exports = {
    User
};