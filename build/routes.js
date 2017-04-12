'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudRoutes = undefined;

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _makeenRouter = require('makeen-router');

var _aws = require('./aws');

var _aws2 = _interopRequireDefault(_aws);

var _azure = require('./azure');

var _azure2 = _interopRequireDefault(_azure);

var _schema = require('./aws/schema');

var awsSchemas = _interopRequireWildcard(_schema);

var _schema2 = require('./azure/schema');

var azureSchemas = _interopRequireWildcard(_schema2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

let CloudRoutes = exports.CloudRoutes = (_dec = _makeenRouter.route.get({
  method: 'GET',
  path: '/aws/list',
  config: {
    description: 'AWS endopoint',
    auth: false,
    plugins: {
      'hapi-swagger': {
        responseMessages: awsSchemas.listInstancesResponse
      }
    }
  }
}), _dec2 = _makeenRouter.route.get({
  method: 'GET',
  path: '/azure/list',
  config: {
    description: 'Azure list endopoint',
    auth: false,
    plugins: {
      'hapi-swagger': {
        responseMessages: azureSchemas.listInstancesResponse
      }
    }
  }
}), _dec3 = _makeenRouter.route.get({
  method: 'GET',
  path: '/aws/stop',
  config: {
    description: 'AWS stop instances endopoint',
    auth: false,
    validate: {
      query: {
        instanceIds: _joi2.default.array().items(_joi2.default.string())
      }
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: awsSchemas.stopInstancesResponse
      }
    }
  }
}), _dec4 = _makeenRouter.route.get({
  method: 'GET',
  path: '/azure/stop',
  config: {
    description: 'Azure stop instances endopoint',
    auth: false,
    validate: {
      query: {
        instanceIds: _joi2.default.array().items(_joi2.default.string())
      }
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: awsSchemas.stopInstancesResponse
      }
    }
  }
}), _dec5 = _makeenRouter.route.get({
  method: 'GET',
  path: '/aws/start',
  config: {
    description: 'AWS start instances endopoint',
    auth: false,
    validate: {
      query: {
        instanceIds: _joi2.default.array().items(_joi2.default.string())
      }
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: awsSchemas.startInstancesResponse
      }
    }
  }
}), _dec6 = _makeenRouter.route.get({
  method: 'GET',
  path: '/azure/start',
  config: {
    description: 'Azure start instances endopoint',
    auth: false,
    validate: {
      query: {
        instanceIds: _joi2.default.array().items(_joi2.default.string())
      }
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: awsSchemas.startInstancesResponse
      }
    }
  }
}), (_class = class CloudRoutes extends _makeenRouter.Router {
  constructor(awsCredentials, azureCredentials) {
    super({
      namespace: 'ASE',
      basePath: '/ase'
    });

    this.es2Client = null;
    this.ec2Client = new _aws2.default(awsCredentials);
    this.azureClient = new _azure2.default();
    this.azureClient.init(azureCredentials);
  }

  listAwsInstances() {
    return this.ec2Client.listInstances();
  }

  listAzureInstances() {
    return this.azureClient.listInstances();
  }

  stopInstances(request) {
    const instanceIds = request.query.instanceIds;


    return this.ec2Client.turnInstancesOff(instanceIds);
  }

  stopAzureInstances(request) {
    const instanceIds = request.query.instanceIds;


    return this.azureClient.turnInstancesOff(instanceIds);
  }

  startInstances(request) {
    const instanceIds = request.query.instanceIds;


    return this.ec2Client.turnInstancesOn(instanceIds);
  }

  starAzureInstances(request) {
    const instanceIds = request.query.instanceIds;


    return this.azureClient.turnInstancesOn(instanceIds);
  }
}, (_applyDecoratedDescriptor(_class.prototype, 'listAwsInstances', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'listAwsInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'listAzureInstances', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'listAzureInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'stopInstances', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'stopInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'stopAzureInstances', [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'stopAzureInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'startInstances', [_dec5], Object.getOwnPropertyDescriptor(_class.prototype, 'startInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'starAzureInstances', [_dec6], Object.getOwnPropertyDescriptor(_class.prototype, 'starAzureInstances'), _class.prototype)), _class));

exports.default = (server, { awsCredentials, azureCredentials }) => {
  const routes = new CloudRoutes(awsCredentials, azureCredentials);

  routes.mount(server);
};