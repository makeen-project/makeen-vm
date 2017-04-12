'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../helpers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _window = window;
const expect = _window.expect,
      beforeEach = _window.beforeEach;


const azureClient = new _index2.default();

var _loadPluginOptions = (0, _index3.loadPluginOptions)();

const azureCredentials = _loadPluginOptions.azureCredentials;


window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 350000;

beforeEach(_asyncToGenerator(function* () {
  yield azureClient.init(azureCredentials);
}));

test('should authenticate correctly', _asyncToGenerator(function* () {
  const isConnected = yield azureClient.isConnected();

  expect(isConnected).toBe(true);
}));

test('should list instances correctly', _asyncToGenerator(function* () {
  const instances = yield azureClient.listInstances();

  // console.log(JSON.stringify(instances.map(i => i), null, 2));

  expect(instances).toBeDefined();
}));

test('should turn instance off', _asyncToGenerator(function* () {
  const instances = yield azureClient.listInstances();

  const activeMachine = instances.find(function ({ instanceView: { statuses } }) {
    return statuses.find(function ({ code }) {
      return code === 'PowerState/running';
    });
  });
  if (!activeMachine) {
    expect(true).toBe(false);
    return;
  }

  const result = yield azureClient.turnInstancesOff([activeMachine.id]);

  expect(result).toBeDefined();
}));

test('should turn instance on', _asyncToGenerator(function* () {
  const instances = yield azureClient.listInstances();

  const activeMachine = instances.find(function ({ instanceView: { statuses } }) {
    return statuses.find(function ({ code }) {
      return code === 'PowerState/stopped';
    });
  });
  if (!activeMachine) {
    expect(true).toBe(false);
    return;
  }

  const result = yield azureClient.turnInstancesOn([activeMachine.id]);

  expect(result).toBeDefined();
}));