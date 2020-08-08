'use strict';
var jwt = require('jsonwebtoken');
var request = require('request');

exports.handler = function(event, context, callback) {
    if (!event.authToken){
        callback('Could not find authToken');
        return;
    }
    
    var token = event.authToken.split(' ')[1];

    var secretBuffer = new Buffer(process.env.AUTH0_SECRET);
    jwt.verify(token, secretBuffer, function(err, decoded) {
        
    })
};