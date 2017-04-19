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

var azureSchemas = _interopRequireWildcard(_schema);

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
        instanceIds: _joi2.default.array().items(_joi2.default.string()).min(1).unique().required()
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
        instanceIds: _joi2.default.array().items(_joi2.default.string()).min(1).unique().required()
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

    Object.keys(this.routes).forEach(routeName => {
      const config = this.routes[routeName].config;

      config.auth = authOption;
    });
  }

  listAzureInstances() {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        const result = yield _this.azureClient.listInstances();

        return result;
      } catch (e) {
        return _boom2.default.badRequest(e.message);
      }
    })();
  }

  stopAzureInstances(request) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      try {
        const instanceIds = request.query.instanceIds;

        const result = yield _this2.azureClient.turnInstancesOff(instanceIds);

        return result;
      } catch (e) {
        return _boom2.default.badRequest(e.message);
      }
    })();
  }

  startAzureInstances(request) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      try {
        const instanceIds = request.query.instanceIds;

        const result = yield _this3.azureClient.turnInstancesOn(instanceIds);

        return result;
      } catch (e) {
        return _boom2.default.badRequest(e.message);
      }
    })();
  }
}, (_applyDecoratedDescriptor(_class.prototype, 'listAzureInstances', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'listAzureInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'stopAzureInstances', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'stopAzureInstances'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'startAzureInstances', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'startAzureInstances'), _class.prototype)), _class));
exports.default = AzureRoutes;