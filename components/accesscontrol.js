// Import express module (require = angular import)
const express = require("express");

// Dependency import
const AccessControl = require('express-ip-access-control');

// Environment variables
require("dotenv/config")

//Access control options
const options = {
    mode: 'deny',
    denys: ["192.168.0.13"],
    allows: ["192.168.0.24", "127.0.0.1"],
    forceConnectionAddress: false,
    log: function(clientIp, access) {
        console.log(clientIp + (access ? ' accessed.' : ' denied.'));
    },

    statusCode: 401,
    redirectTo: '',
    message: 'Unauthorized'
};

module.exports = AccessControl(options);