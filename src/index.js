import pkg from '../package.json';
import routesBuilder from './routes';

export async function register(server, options, next) {
  try {
    routesBuilder(server, options);

    next();
  } catch (err) {
    next(err);
  }
}

register.attributes = {
  pkg,
  dependencies: ['makeen-core'],
};
