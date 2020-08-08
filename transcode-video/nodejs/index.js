'use strict';
var AWS = require('aws-sdk');

var elasticTranscoder = new AWS.ElasticTranscoder({
    region: 'us-east-1',
    accessKeyId: 'AKIAUGPUD7ADPS3HU3C3',
    secretAccessKey: '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'
  });

exports.handler = function(event, context, callback) {
    console.log('Welcome');

    var key = event.Records[0].s3.object.key;

    //Remplazando los espacios en el nombre del video por un simbolo de mas (+).
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));

    //Quita la extension del archivo.
    var outputKey = sourceKey.split('.')[0];

    var params = {
        PipelineId: '1596640623976-23uz38',
        Input: {
            Key: sourceKey
        },
        Outputs: [
            {
                Key: outputKey + '-1080p' + '.mp4',
                PresetId: '1351620000001-000001' //1080p Generico en ET
            },
            {
                Key: outputKey + '-720p' + '.mp4',
                PresetId: '1351620000001-000010' //720p Generico en ET
            },
            {
                Key: outputKey + '-web-720p' + '.mp4',
                PresetId: '1351620000001-100070' //720p de Web en ET
            }            
        ]};
    
    elasticTranscoder.createJob(params, function(error, data){
        if (error){
            callback(error);
        }
    });
};