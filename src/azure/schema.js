import Joi from 'joi';

export const azureOptionsSchema = {
  key: Joi.string().required(),
  appId: Joi.string().required(),
  tenantId: Joi.string().required(),
  subscriptionId: Joi.string().required(),
  user: Joi.string(),
  password: Joi.string(),
};

const instanceSchema = {
  id: Joi.string().example('/subscriptions/0e9d4d28-a996-4873-a0e5-edc324ce5800/resourceGroups/group/providers/Microsoft.Compute/virtualMachines/azure-ubuntu'),
  name: Joi.string().example('azure-ubuntu'),
  type: Joi.string().example('Microsoft.Compute/virtualMachines'),
  location: Joi.string().example('australiaeast'),
  hardwareProfile: Joi.object().keys({
    vmSize: Joi.string().example('Standard_D1_v2'),
  }),
  storageProfile: Joi.object().keys({
    imageReference: Joi.object({
      publisher: Joi.string().example('MicrosoftWindowsServer'),
      offer: Joi.string().example('WindowsServer'),
      sku: Joi.string().example('2012-R2-Datacenter'),
      version: Joi.string().example('latest'),
    }),
    osDisk: Joi.object({
      osType: Joi.string().example('Windows'),
      name: Joi.string().example('NPS-Win-2012'),
      vhd: Joi.object({
        uri: Joi.string().example('https://2342342.blob.core.windows.net/vhds/NPS-Win-201220170324152017.vhd'),
      }),
      caching: Joi.string().example('ReadWrite'),
      createOption: Joi.string().example('FromImage'),
    }),
    dataDisks: Joi.array(),
  }),
  osProfile: Joi.object().keys({
    computerName: Joi.string().example('azure-ubuntu'),
    adminUsername: Joi.string().example('admin'),
    linuxConfiguration: Joi.object(),
    windowsConfiguration: Joi.object(),
    secrets: Joi.array(),
  }),
  networkProfile: Joi.object().keys({
    networkInterfaces: Joi.array().items(
      Joi.object({
        id: Joi.string().example('/subscriptions/0e9d4d28-a996-4873-a0e5-edc324ce5800/resourceGroups/RG/providers/Microsoft.Network/networkInterfaces/nps-win-2012448'),
      }),
    ),
  }),
  provisioningState: Joi.string().example('Succeeded'),
  vmId: Joi.string().example('225e1110-b047-45e7-b390-a497a25c4b2d'),
  instanceView: Joi.object({
    vmAgent: Joi.object({
      vmAgentVersion: Joi.string().example('2.7.1198.797'),
      extensionHandlers: Joi.array(),
      statuses: Joi.array().items(
        Joi.object({
          code: Joi.string().example('ProvisioningState/succeeded'),
          level: Joi.string().example('Info'),
          displayStatus: Joi.string().example('Ready'),
          message: Joi.string().example('GuestAgent is running and accepting new configurations.'),
          time: Joi.date().example('2017-04-05T17:05:39.000Z'),
        }),
      ),
    }),
    disks: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().example('NPS-Win-2012'),
        statuses: Joi.array().items(
          Joi.object({
            code: Joi.string().example('ProvisioningState/succeeded'),
            level: Joi.string().example('Info'),
            displayStatus: Joi.string().example('Provisioning succeeded'),
            time: Joi.date().example('2017-03-24T04:21:41.703Z'),
          }),
        ),
      }),
    ),
    statuses: Joi.array().items(
      Joi.object({
        code: Joi.string(), // 'ProvisioningState/succeeded', 'ProvisioningState/updating', 'PowerState/deallocating'. 'PowerState/deallocated', 'PowerState/starting' PowerState/running'
        level: Joi.string().example('Info'),
        displayStatus: Joi.string().example('Provisioning succeeded'),
        time: Joi.date().example('2017-03-24T04:24:11.990Z'),
      }),
    ),
  }),
};

export const listInstancesResponse = Joi.array().items(instanceSchema);

