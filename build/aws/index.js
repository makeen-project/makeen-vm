'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let EC2Client = class EC2Client {

  constructor(awsCredentials) {
    this.ec2 = null;

    _joi2.default.attempt(awsCredentials, _schema.awsOptionsSchema);

    this.ec2 = new _awsSdk2.default.EC2(awsCredentials);
  }

  isConnected() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return !!_this.ec2.config.credentials;
    })();
  }

  listInstances() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const listInstances = _bluebird2.default.promisify(_this2.ec2.describeInstances, { context: _this2.ec2 });
      const response = yield listInstances({ DryRun: false });

      _joi2.default.attempt(response, _schema.listInstancesResponse);

      var _response$Reservation = _slicedToArray(response.Reservations, 1);

      const Instances = _response$Reservation[0];

      return Instances;
    })();
  }

  turnInstancesOff(instanceIds) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const stopInstances = _bluebird2.default.promisify(_this3.ec2.stopInstances, { context: _this3.ec2 });
      const result = yield stopInstances({ InstanceIds: instanceIds });

      _joi2.default.attempt(result, _schema.stopInstancesResponse);

      return result;
    })();
  }

  turnInstancesOn(instanceIds) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const startInstances = _bluebird2.default.promisify(_this4.ec2.startInstances, { context: _this4.ec2 });
      const result = yield startInstances({ InstanceIds: instanceIds });

      _joi2.default.attempt(result, _schema.startInstancesResponse);

      return result;
    })();
  }
};
exports.default = EC2Client;