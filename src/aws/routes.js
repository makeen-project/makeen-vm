import Joi from 'joi';
import { Router, route } from 'makeen-router';
import EC2Client from './index';
import * as awsSchemas from './schema';

export default class AwsRoutes extends Router {
  es2Client = null;
  constructor(awsCredentials) {
    super({
      namespace: 'MakeenVM.AWS',
      basePath: '/vm/aws',
    });

    this.ec2Client = new EC2Client(awsCredentials);
  }

  @route.get({
    method: 'GET',
    path: '/list',
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
    path: '/stop',
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
    path: '/start',
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
}