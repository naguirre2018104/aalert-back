"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var alertSchema = Schema({
  date: Date,
  status: { type: Boolean, default: true },
  name: String,
  lastname: String,
  age: Number,
  place: Object,
  lastdate: Date,
  sex: String,
  image: String,
  user: { type: mongoose.Schema.ObjectId, ref: "user" },
  departament: { type: mongoose.Schema.ObjectId, ref: "user" },
  description: {
    tez: String,
    complexion: String,
    hair: String,
    special_signs: String,
  },
  showAlert: {type: Boolean, default: true},
  agree: {type: Boolean, default: true}
});

module.exports = mongoose.model("alert", alertSchema);
