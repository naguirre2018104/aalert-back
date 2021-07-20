"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departamentSchema = Schema({
    name: String,
});

module.exports = mongoose.model("department", departamentSchema);