'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPluginOptions = exports.loadManifest = undefined;

var _confidence = require('confidence');

var _confidence2 = _interopRequireDefault(_confidence);

var _environmentOverride = require('environment-override');

var _environmentOverride2 = _interopRequireDefault(_environmentOverride);

var _serverManifest = require('../../../../serverManifest.json');

var _serverManifest2 = _interopRequireDefault(_serverManifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loadManifest = exports.loadManifest = () => {
  const store = new _confidence2.default.Store(_serverManifest2.default);
  const manifest = store.get('/', { env: process.env.NODE_ENV });

  const prefix = 'MAKEEN_ENV_';

  (0, _environmentOverride2.default)(manifest, prefix);

  return manifest;
};

const loadPluginOptions = exports.loadPluginOptions = () => {
  var _loadManifest = loadManifest();

  const registrations = _loadManifest.registrations;


  const asePlugin = registrations.find(({ plugin: { register } }) => register === './ase');

  return asePlugin.plugin.options;
};