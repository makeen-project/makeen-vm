'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../helpers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 350000;

var _loadPluginOptions = (0, _index3.loadPluginOptions)();

const awsCredentials = _loadPluginOptions.awsCredentials;
var _window = window;
const expect = _window.expect;


const ec2Client = new _index2.default(awsCredentials);

test('should authenticate correctly', _asyncToGenerator(function* () {
  const isConnected = yield ec2Client.isConnected();

  expect(isConnected).toBe(true);
}));

test('should list instances correctly', _asyncToGenerator(function* () {
  const instances = yield ec2Client.listInstances();

  expect(instances).toBeDefined();
}));

test('should turn instance off', _asyncToGenerator(function* () {
  var _ref4 = yield ec2Client.listInstances(),
      _ref4$Instances = _slicedToArray(_ref4.Instances, 1),
      _ref4$Instances$ = _ref4$Instances[0];

  const InstanceId = _ref4$Instances$.InstanceId,
        State = _ref4$Instances$.State;


  if (State.Name !== 'running') {
    return;
  }
  const result = yield ec2Client.turnInstancesOff([InstanceId]);

  expect(result).toBeDefined();
}));

test('should turn instance on', _asyncToGenerator(function* () {
  var _ref6 = yield ec2Client.listInstances(),
      _ref6$Instances = _slicedToArray(_ref6.Instances, 1),
      _ref6$Instances$ = _ref6$Instances[0];

  const InstanceId = _ref6$Instances$.InstanceId,
        State = _ref6$Instances$.State;


  if (State.Name !== 'stopped') {
    return;
  }

  const result = yield ec2Client.turnInstancesOn([InstanceId]);

  expect(result).toBeDefined();
}));