"use strict";

const express = require("express");
const userController = require("../controllers/user-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();


api.post("/register", userController.register);
api.post("/login", userController.login);
api.put("/modifyUser/:id", mdAuth.ensureUser, userController.modifyUser);
api.put("/deleteUser/:id", mdAuth.ensureUser, userController.deleteUser);

api.get("/getAllUsers", [mdAuth.ensureUser, mdAuth.ensureAdmin],userController.getAllUsers);

api.get("/getUserbyID", [mdAuth.ensureUser], userController.getUserbyID);


module.exports = api;