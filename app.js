"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/user-route");
const alertRoutes = require("./routes/alert-route");
const departamentRoutes = require("./routes/department-route");

let app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use("/api", userRoutes);
app.use("/api", alertRoutes);
app.use("/api", departamentRoutes);

module.exports = app;