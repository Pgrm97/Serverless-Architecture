'use strict';
var AWS = require('aws-sdk');

var s3 = new AWS.S3();

exports.handler = function(event, context, callback) {
    console.log(event.Records[0].Sns);
    var message = JSON.parse(event.Records[0].Sns.Message);
    
    //Recoge el nombre del bucket de S3.
    var sourceBucket = message.Records[0].s3.bucket.name;

    //Remplaza el + (Default de S3) por espacios.
    var sourceKey = decodeURIComponent(message.Records[0].s3.object.key.replace(/\+/g, ' '));

    //public-read hace que el archivo este disponible para todos.
    var params = {
        Bucket: sourceBucket,
        Key: sourceKey,
        ACL: 'public-read'    
    };
    
    s3.putObjectAcl(params, function(error, data){
        if (error){
            callback(error);
        }
    });
};