const environmentConfigs = {
  dev: {
    env: 'dev',
    tableName: 'TestTable'
  },
  preprod: {
    env: 'preprod',
    tableName: process.env.TABLE_NAME
  }
};
const targetEnvironment = process.env.ENVIRONMENT || 'dev';
const config = environmentConfigs[targetEnvironment];

module.exports = config;