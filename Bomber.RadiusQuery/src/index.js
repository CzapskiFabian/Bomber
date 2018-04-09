import { radiusSearch } from './services/radiusSearchService';

/*eslint-disable */
exports.handler = async (event, context) => {
    console.log('radiusSearchService');
    console.log(radiusSearchService);
    var data = await radiusSearchService.radiusSearch(event.coordinates);
    context.succeed({
        statusCode: '200',
        body: data,
        headers: { 'Content-Type': 'application/json'}
    });
};
