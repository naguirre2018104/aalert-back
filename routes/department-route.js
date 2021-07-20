"use strict";

const express = require("express");
const departamentController = require("../controllers/department-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post(
    "/createDepartament", [mdAuth.ensureUser],
    departamentController.createDepartament
);
api.put(
    "/updateDepartament/:id", [mdAuth.ensureUser],
    departamentController.updateDepartament
);
api.delete(
    "/deleteDepartament/:id", [mdAuth.ensureUser],
    departamentController.deleteDepartament
);
api.get(
    "/getDepartaments", [mdAuth.ensureUser],
    departamentController.getAllDepartaments
);
api.get(
    "/getDepartamentByID/:id", [mdAuth.ensureUser],
    departamentController.getDepartamentByID
);

module.exports = api;