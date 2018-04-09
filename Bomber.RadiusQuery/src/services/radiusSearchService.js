import AWS from 'aws-sdk';
import config from '../config/config';
const ddbGeo = require('dynamodb-geo');

AWS.config.update({ region: 'eu-central-1' });

const radiusSearch = (coordinates) => {
  const ddb = new AWS.DynamoDB();
  const ddbGeoConfig = new ddbGeo.GeoDataManagerConfiguration(ddb, config.tableName);
  const myGeoTableManager = new ddbGeo.GeoDataManager(ddbGeoConfig);
  // Querying a rectangle
  return myGeoTableManager.queryRadius({
    RadiusInMeter: 200,
    CenterPoint: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    }
  })
    .then(function (data) {
      return data;
    });
};

export { radiusSearch };