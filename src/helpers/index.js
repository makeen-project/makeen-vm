import Confidence from 'confidence';
import override from 'environment-override';
import manifestConfig from '../../../../serverManifest.json';

export const loadManifest = () => {
  const store = new Confidence.Store(manifestConfig);
  const manifest = store.get('/', { env: process.env.NODE_ENV });

  const prefix = 'MAKEEN_ENV_';

  override(manifest, prefix);

  return manifest;
};

export const loadPluginOptions = () => {
  const { registrations } = loadManifest();

  const asePlugin = registrations.find(({ plugin: { register } }) => register === './ase');

  return asePlugin.plugin.options;
};


