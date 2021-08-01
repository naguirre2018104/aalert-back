"use strict";

const express = require("express");
const alertController = require("../controllers/alert-controller");
const mdAuth = require("../middlewares/authenticated");
const connectMultiparty = require("connect-multiparty");
const upload = connectMultiparty({ uploadDir: "./uploads/alerts" });

var api = express.Router();

api.post("/createAlert", [mdAuth.ensureUser], alertController.createAlert);
api.put("/updateAlert/:id", [mdAuth.ensureUser], alertController.updateAlert);
api.delete(
    "/deleteAlert/:id", [mdAuth.ensureUser],
    alertController.deleteAlert
);
api.get("/getAlerts", [mdAuth.ensureUser], alertController.getAllAlerts);
api.get("/getAlertByID/:id", [mdAuth.ensureUser], alertController.getAlertByID);
api.put(
    "/uploadImage/:id", [mdAuth.ensureUser, upload],
    alertController.uploadImage
);
api.get("/getImage/:fileName", [upload], alertController.getImage);
api.get("/getUserAlerts",[mdAuth.ensureUser], alertController.getUserAlerts);
api.put("/updateCanShowAlert/:idA", [mdAuth.ensureUser], alertController.updateCanShowAlert)

module.exports = api;