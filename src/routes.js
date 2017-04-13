import AwsRoutes from './aws/routes';
import AzureRoutes from './azure/routes';

export default (server, { awsCredentials, azureCredentials }) => {
  const awsRoutes = new AwsRoutes(awsCredentials);
  const azureRoutes = new AzureRoutes(azureCredentials);

  awsRoutes.mount(server);
  azureRoutes.mount(server);
};


