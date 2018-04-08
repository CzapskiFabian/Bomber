const AWS = require('aws-sdk');
const zip = new require('node-zip')();
const fs = require('fs');

zip.file(
  'index.js', 
  fs.readFileSync('artifact/bomber-create-database.package.js', 'utf8'));

fs.writeFileSync(
  'artifact.zip', 
  zip.generate({ base64: false, compression: 'DEFLATE' }),  
  'binary');