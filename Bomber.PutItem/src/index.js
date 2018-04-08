import AWS from 'aws-sdk';
import config from './config/config';
import uuid from 'uuid';
const ddbGeo = require('dynamodb-geo');

AWS.config.update({ region: 'eu-central-1' });

/*eslint-disable */
exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB();
    const ddbGeoConfig = new ddbGeo.GeoDataManagerConfiguration(ddb, config.tableName);
    ddbGeoConfig.longitudeFirst = true; 
    const myGeoTableManager = new ddbGeo.GeoDataManager(ddbGeoConfig);
    
    myGeoTableManager.putPoint({
        RangeKeyValue: { S: uuid.v1() },
        GeoPoint: { 
            latitude: event.coordinates.latitude,
            longitude: event.coordinates.longitude
        },
        PutItemInput: {
            Item: {
                username: { S: event.username }, 
                content: { S: event.content }
            }
        }
    }).promise()
    .then(function() { 
        context.succeed({
			statusCode: '200',
			headers: { 'Content-Type': 'application/json'}
		});
     });
};
  