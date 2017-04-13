'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('./aws/routes');

var _routes2 = _interopRequireDefault(_routes);

var _routes3 = require('./azure/routes');

var _routes4 = _interopRequireDefault(_routes3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (server, { awsCredentials, azureCredentials }) => {
  const awsRoutes = new _routes2.default(awsCredentials);
  const azureRoutes = new _routes4.default(azureCredentials);

  awsRoutes.mount(server);
  azureRoutes.mount(server);
};