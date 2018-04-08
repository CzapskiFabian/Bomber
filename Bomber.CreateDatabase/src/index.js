import AWS from 'aws-sdk';
import config from './config/config';
const ddbGeo = require('dynamodb-geo');

AWS.config.update({ region: 'eu-central-1' });

/*eslint-disable */
exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB();
    const ddbGeoConfig = new ddbGeo.GeoDataManagerConfiguration(ddb, config.tableName);
    ddbGeoConfig.longitudeFirst = true; 
    const myGeoTableManager = new ddbGeo.GeoDataManager(ddbGeoConfig);

    // Pick a hashKeyLength appropriate to your usage
    ddbGeoConfig.hashKeyLength = 3;
    
    // Use GeoTableUtil to help construct a CreateTableInput.
    const createTableInput = ddbGeo.GeoTableUtil.getCreateTableRequest(ddbGeoConfig);
    
    // Tweak the schema as desired
    createTableInput.ProvisionedThroughput.ReadCapacityUnits = 2;

    // Create the table
    ddb.createTable(createTableInput).promise()
        // Wait for it to become ready
        .then(function () { console.log("created"); return ddb.waitFor('tableExists', { TableName: ddbGeoConfig.tableName }).promise() })
        .then(function () { console.log('Table created and ready!') });
};
  