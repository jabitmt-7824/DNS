const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password atleast contain 6 characters"],
        maxlength: [10, "password deos not exceed 10 characters"]
    },
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;