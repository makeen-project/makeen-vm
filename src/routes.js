import AwsRoutes from './aws/routes';
import AzureRoutes from './azure/routes';

export default (server, { awsCredentials, azureCredentials }) => {
  if (awsCredentials) {
    const awsRoutes = new AwsRoutes(awsCredentials);
    awsRoutes.mount(server);
  }

  if (azureCredentials) {
    const azureRoutes = new AzureRoutes(azureCredentials);
    azureRoutes.mount(server);
  }
};


