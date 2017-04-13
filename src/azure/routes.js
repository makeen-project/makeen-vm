import Joi from 'joi';
import { Router, route } from 'makeen-router';
import AzureClient from './index';
import * as azureSchemas from './schema';

export default class AzureRoutes extends Router {
  es2Client = null;
  constructor(azureCredentials) {
    super({
      namespace: 'MakeenVM.Azure',
      basePath: '/vm/azure',
    });

    this.azureClient = new AzureClient();
    this.azureClient.init(azureCredentials);
  }

  @route.get({
    method: 'GET',
    path: '/list',
    config: {
      description: 'Azure list endopoint',
      auth: false,
      plugins: {
        'hapi-swagger': {
          responseMessages: azureSchemas.listInstancesResponse,
        },
      },
    },
  })
  listAzureInstances() {
    return this.azureClient.listInstances();
  }

  @route.get({
    method: 'GET',
    path: '/stop',
    config: {
      description: 'Azure stop instances endopoint',
      auth: false,
      validate: {
        query: {
          instanceIds: Joi.array().items(
            Joi.string(),
          ),
        },
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [],
        },
      },
    },
  })
  stopAzureInstances(request) {
    const { instanceIds } = request.query;

    return this.azureClient.turnInstancesOff(instanceIds);
  }

  @route.get({
    method: 'GET',
    path: '/start',
    config: {
      description: 'Azure start instances endopoint',
      auth: false,
      validate: {
        query: {
          instanceIds: Joi.array().items(
            Joi.string(),
          ),
        },
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [],
        },
      },
    },
  })
  starAzureInstances(request) {
    const { instanceIds } = request.query;

    return this.azureClient.turnInstancesOn(instanceIds);
  }
}