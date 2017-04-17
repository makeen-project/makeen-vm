'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _desc, _value, _class;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _makeenRouter = require('makeen-router');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _schema = require('./schema');

var azureSchemas = _interopRequireWildcard(_schema);

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

let AzureRoutes = (_dec = _makeenRouter.route.get({
  method: 'GET',
  path: '/list',
  config: {
    description: 'Azure list endopoint',
    auth: false,
    plugins: {
      'hapi-swagger': {
        responseMessages: azureSchemas.listInstancesResponse
      }
    }
  }
}), _dec2 = _makeenRouter.route.get({
  method: 'GET',
  path: '/stop',
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
        responseMessages: []
      }
    }
  }
}), _dec3 = _makeenRouter.route.get({
  method: 'GET',
  path: '/start',
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
        responseMessages: []
      }
    }
  }
}), (_class = class AzureRoutes extends _makeenRouter.Router {

  constructor(azureCredentials, authOption) {
    super({
      namespace: 'MakeenVM.Azure',
      basePath: '/vm/azure'
    });

    this.es2Client = null;
    this.azureClient = new _index2.default();
    this.azureClient.init(azureCredentials);

    Object.keys(this.routes).forEach(route => {
      const config = this.routes[route].config;

      config.auth = authOption;
    });
  }

  listAzureInstances() {
    return this.azureClient.listInstances();
  }

  stopAzureInstances(request) {
    const instanceIds = request.query.instanceIds;


    return this.azureClient.turnInstancesOff(instanceIds);
  }

  starAzureInstances(request) {
    const instanceIds = request.query.instanceIds;


    return this.azureClient.turnInstancesOn(instanceIds);
  }
}, (_applyDecoratedDescriptor(_class.prototype, 'listAzureInstances', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'listAzureInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'stopAzureInstances', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'stopAzureInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'starAzureInstances', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'starAzureInstances'), _class.prototype)), _class));
exports.default = AzureRoutes;