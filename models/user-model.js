"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    age: Number,
    DPI: Number,
    status: { type: Boolean, default: true },
    role: {type: String, default: "ROLE_CLIENT"},
    phone: Number
});

module.exports = mongoose.model("user",userSchema);