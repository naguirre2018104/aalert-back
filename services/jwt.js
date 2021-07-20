"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secretKey = "grupo3inam";

exports.createToken = (user) => {
    var payload = {
        sub: user._id,
        username: user.username,
        password: user.password,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(8, "hours").unix()
    };
    return jwt.encode(payload, secretKey);
};