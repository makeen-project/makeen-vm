import Joi from 'joi';
import { Router, route } from 'makeen-router';
import EC2Client from './aws';
import AzureClient from './azure';
import * as awsSchemas from './aws/schema';
import * as azureSchemas from './azure/schema';

export class CloudRoutes extends Router {
  es2Client = null;
  constructor(awsCredentials, azureCredentials) {
    super({
      namespace: 'MakeenVM',
      basePath: '/vm',
    });

    this.ec2Client = new EC2Client(awsCredentials);
    this.azureClient = new AzureClient();
    this.azureClient.init(azureCredentials);
  }

  @route.get({
    method: 'GET',
    path: '/aws/list',
    config: {
      description: 'AWS endopoint',
      auth: false,
      plugins: {
        'hapi-swagger': {
          responseMessages: awsSchemas.listInstancesResponse,
        },
      },
    },
  })
  listAwsInstances() {
    return this.ec2Client.listInstances();
  }

  @route.get({
    method: 'GET',
    path: '/azure/list',
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
    path: '/aws/stop',
    config: {
      description: 'AWS stop instances endopoint',
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
          responseMessages: awsSchemas.stopInstancesResponse,
        },
      },
    },
  })
  stopInstances(request) {
    const { instanceIds } = request.query;

    return this.ec2Client.turnInstancesOff(instanceIds);
  }


  @route.get({
    method: 'GET',
    path: '/azure/stop',
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
          responseMessages: awsSchemas.stopInstancesResponse,
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
    path: '/aws/start',
    config: {
      description: 'AWS start instances endopoint',
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
          responseMessages: awsSchemas.startInstancesResponse,
        },
      },
    },
  })
  startInstances(request) {
    const { instanceIds } = request.query;

    return this.ec2Client.turnInstancesOn(instanceIds);
  }

  @route.get({
    method: 'GET',
    path: '/azure/start',
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
          responseMessages: awsSchemas.startInstancesResponse,
        },
      },
    },
  })
  starAzureInstances(request) {
    const { instanceIds } = request.query;

    return this.azureClient.turnInstancesOn(instanceIds);
  }
}


export default (server, { awsCredentials, azureCredentials }) => {
  const routes = new CloudRoutes(awsCredentials, azureCredentials);

  routes.mount(server);
};


