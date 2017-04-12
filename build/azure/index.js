'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _msRestAzure = require('ms-rest-azure');

var _msRestAzure2 = _interopRequireDefault(_msRestAzure);

var _azureArmCompute = require('azure-arm-compute');

var _azureArmCompute2 = _interopRequireDefault(_azureArmCompute);

var _azureArmStorage = require('azure-arm-storage');

var _azureArmStorage2 = _interopRequireDefault(_azureArmStorage);

var _azureArmNetwork = require('azure-arm-network');

var _azureArmNetwork2 = _interopRequireDefault(_azureArmNetwork);

var _azureArmResource = require('azure-arm-resource');

var _lodash = require('lodash');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let AzureClient = class AzureClient {
  constructor() {
    this.resourceClient = null;
    this.resourceClient = null;
    this.computeClient = null;
    this.storageClient = null;
    this.networkClient = null;
  }

  init(azureCredentials) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _joi2.default.attempt(azureCredentials, _schema.azureOptionsSchema);

      const tenantId = azureCredentials.tenantId,
            subscriptionId = azureCredentials.subscriptionId,
            user = azureCredentials.user,
            password = azureCredentials.password;


      const login = _bluebird2.default.promisify(_msRestAzure2.default.loginWithUsernamePassword, _msRestAzure2.default);

      const credentials = yield login(user, password, { domain: tenantId });

      _this.resourceClient = new _azureArmResource.ResourceManagementClient(credentials, subscriptionId);
      _this.computeClient = new _azureArmCompute2.default(credentials, subscriptionId);
      _this.storageClient = new _azureArmStorage2.default(credentials, subscriptionId);
      _this.networkClient = new _azureArmNetwork2.default(credentials, subscriptionId);

      return _this;
    })();
  }

  isConnected() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      return !!_this2.resourceClient;
    })();
  }

  listInstances() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const groups = yield new _bluebird2.default(function (resolve, reject) {
        _this3.resourceClient.resourceGroups.list(function (err, result) {
          if (err) {
            return reject(err);
          }

          return resolve(result);
        });
      });

      const getInstancesTask = groups.map((() => {
        var _ref = _asyncToGenerator(function* ({ name }) {
          return new _bluebird2.default(function (resolve, reject) {
            _this3.computeClient.virtualMachines.list(name, function (err, result) {
              if (err) {
                return reject({ [name]: err });
              }

              return resolve({ [name]: result });
            });
          });
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      })());

      const instancesByGroup = yield _bluebird2.default.all(getInstancesTask);
      const getInstancesWithStateTasks = instancesByGroup.map(function (group) {
        const groupName = Object.keys(group)[0];
        const groupInstances = group[groupName];

        return groupInstances.map(function ({ name }) {
          return new _bluebird2.default(function (res, rej) {
            _this3.computeClient.virtualMachines.get(groupName, name, { expand: 'instanceView' }, function (err, result) {
              if (err) {
                return rej(err);
              }
              return res(result);
            });
          });
        });
      });

      const instances = yield _bluebird2.default.all((0, _lodash.flatten)(getInstancesWithStateTasks));

      _joi2.default.attempt(instances, _schema.listInstancesResponse);

      return instances;
    })();
  }

  turnInstancesOff(ids) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const stopTasks = ids.map(function (id) {
        var _extractGroupAndName = _this4.extractGroupAndName(id);

        const resourceGroupName = _extractGroupAndName.resourceGroupName,
              vmName = _extractGroupAndName.vmName;


        return new _bluebird2.default(function (resolve, reject) {
          _this4.computeClient.virtualMachines.powerOff(resourceGroupName, vmName, function (err, _result) {
            if (err) {
              return reject(err);
            }
            return resolve(_result);
          });
        });
      });

      const result = yield _bluebird2.default.all(stopTasks);

      // Joi.attempt(result, stopInstancesResponse);

      return result;
    })();
  }

  turnInstancesOn(ids) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const stopTasks = ids.map(function (id) {
        var _extractGroupAndName2 = _this5.extractGroupAndName(id);

        const resourceGroupName = _extractGroupAndName2.resourceGroupName,
              vmName = _extractGroupAndName2.vmName;


        return new _bluebird2.default(function (resolve, reject) {
          _this5.computeClient.virtualMachines.start(resourceGroupName, vmName, function (err, _result) {
            if (err) {
              return reject(err);
            }
            return resolve(_result);
          });
        });
      });

      const result = yield _bluebird2.default.all(stopTasks);

      // Joi.attempt(result, startInstancesResponse);

      return result;
    })();
  }

  extractGroupAndName(vmId) {
    const values = vmId.split('/');
    let resourceGroupName = null;
    let vmName = null;

    values.forEach((value, index) => {
      if (value === 'resourceGroups') {
        resourceGroupName = values[index + 1];
      }

      if (value === 'virtualMachines') {
        vmName = values[index + 1];
      }
    });

    return { resourceGroupName, vmName };
  }
};
exports.default = AzureClient;