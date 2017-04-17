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

var awsSchemas = _interopRequireWildcard(_schema);

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

let auth = false;

let AwsRoutes = (_dec = _makeenRouter.route.get({
  method: 'GET',
  path: '/list',
  config: {
    description: 'AWS endopoint',
    auth,
    plugins: {
      'hapi-swagger': {
        responseMessages: awsSchemas.listInstancesResponse
      }
    }
  }
}), _dec2 = _makeenRouter.route.get({
  method: 'GET',
  path: '/stop',
  config: {
    description: 'AWS stop instances endopoint',
    auth,
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
}), _dec3 = _makeenRouter.route.get({
  method: 'GET',
  path: '/start',
  config: {
    description: 'AWS start instances endopoint',
    auth,
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
}), (_class = class AwsRoutes extends _makeenRouter.Router {
  constructor(awsCredentials, authOption) {
    super({
      namespace: 'MakeenVM.AWS',
      basePath: '/vm/aws'
    });

    this.es2Client = null;
    this.ec2Client = new _index2.default(awsCredentials);
    auth = authOption;
  }

  listAwsInstances() {
    return this.ec2Client.listInstances();
  }

  stopInstances(request) {
    const instanceIds = request.query.instanceIds;


    return this.ec2Client.turnInstancesOff(instanceIds);
  }

  startInstances(request) {
    const instanceIds = request.query.instanceIds;


    return this.ec2Client.turnInstancesOn(instanceIds);
  }
}, (_applyDecoratedDescriptor(_class.prototype, 'listAwsInstances', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'listAwsInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'stopInstances', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'stopInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'startInstances', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'startInstances'), _class.prototype)), _class));
exports.default = AwsRoutes;