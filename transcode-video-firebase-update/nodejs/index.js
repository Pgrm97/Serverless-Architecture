'use strict';
var AWS = require('aws-sdk');
var firebase = require('firebase');

//Función necesaria para correr Firebase.
firebase.initializeApp({
    serviceAccount: process.env.SERVICE_ACCOUNT,
    databaseURL: process.env.DATABASE_URL
});

exports.handler = function(event, context, callback) {
    //Suspende la función cuando se invoca un callback.
    context.callbackWaitsForEmptyEventLoop = false;

    var message = JSON.parse(event.Records[0].Sns.Message);

    var key = message.Records[0].s3.object.key;
    var bucket = message.Records[0].s3.bucket.name;

    //Remplazando los espacios en el nombre del video por un simbolo de mas (+).
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));

    var outputKey = sourceKey.split('.')[0];

    var uniqueVideoKey = outputKey.split('/')[0];

    var database = firebase.database().ref();

    database.child('videos').child(uniqueVideoKey).set({
        transcoding: false,
        key: key,
        bucket: process.env.S3
    }).catch(function(err) {
        callback(err);
    });
};