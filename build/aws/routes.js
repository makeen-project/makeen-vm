'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _desc, _value, _class;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _makeenRouter = require('makeen-router');

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _schema = require('./schema');

var awsSchemas = _interopRequireWildcard(_schema);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

let AwsRoutes = (_dec = _makeenRouter.route.get({
  method: 'GET',
  path: '/list',
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
  path: '/stop',
  config: {
    description: 'AWS stop instances endopoint',
    auth: false,
    validate: {
      query: {
        instanceIds: _joi2.default.array().items(_joi2.default.string()).min(1).unique().required()
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
    auth: false,
    validate: {
      query: {
        instanceIds: _joi2.default.array().items(_joi2.default.string()).min(1).unique().required()
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

    Object.keys(this.routes).forEach(routeName => {
      const config = this.routes[routeName].config;

      config.auth = authOption;
    });
  }

  listAwsInstances() {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        const result = yield _this.ec2Client.listInstances();

        return result;
      } catch (e) {
        return _boom2.default.badRequest(e.message);
      }
    })();
  }

  stopInstances(request) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      try {
        const instanceIds = request.query.instanceIds;

        const result = yield _this2.ec2Client.turnInstancesOff(instanceIds);

        return result;
      } catch (e) {
        return _boom2.default.badRequest(e.message);
      }
    })();
  }

  startInstances(request) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      try {
        const instanceIds = request.query.instanceIds;

        const result = yield _this3.ec2Client.turnInstancesOn(instanceIds);

        return result;
      } catch (e) {
        return _boom2.default.badRequest(e.message);
      }
    })();
  }
}, (_applyDecoratedDescriptor(_class.prototype, 'listAwsInstances', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'listAwsInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'stopInstances', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'stopInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'startInstances', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'startInstances'), _class.prototype)), _class));
exports.default = AwsRoutes;