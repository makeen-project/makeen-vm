'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = undefined;

let register = exports.register = (() => {
  var _ref = _asyncToGenerator(function* (server, options, next) {
    try {
      (0, _routes2.default)(server, options);

      next();
    } catch (err) {
      next(err);
    }
  });

  return function register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

register.attributes = {
  pkg: _package2.default,
  dependencies: ['makeen-core']
};