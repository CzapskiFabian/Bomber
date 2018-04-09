import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import index from '../src/index';

chai.use(sinonChai);

describe('index', () => {
    it('should do something', () => {
        var event = {
            "coordinates":{
                "latitude":51.509865,
                "longitude":-0.118092
            }
          };
        index.handler(event, {});
      });
});