import AwsRoutes from './aws/routes';
import AzureRoutes from './azure/routes';

export default (server, { awsCredentials, azureCredentials, auth }) => {
  if (awsCredentials) {
    const awsRoutes = new AwsRoutes(awsCredentials, auth || 'base');
    awsRoutes.mount(server);
  }

  if (azureCredentials) {
    const azureRoutes = new AzureRoutes(azureCredentials, auth || 'base');
    azureRoutes.mount(server);
  }
};


