'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listInstancesResponse = exports.azureOptionsSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const azureOptionsSchema = exports.azureOptionsSchema = {
  key: _joi2.default.string().required(),
  appId: _joi2.default.string().required(),
  tenantId: _joi2.default.string().required(),
  subscriptionId: _joi2.default.string().required(),
  user: _joi2.default.string(),
  password: _joi2.default.string()
};

const instanceSchema = {
  id: _joi2.default.string().example('/subscriptions/0e9d4d28-a996-4873-a0e5-edc324ce5800/resourceGroups/group/providers/Microsoft.Compute/virtualMachines/azure-ubuntu'),
  name: _joi2.default.string().example('azure-ubuntu'),
  type: _joi2.default.string().example('Microsoft.Compute/virtualMachines'),
  location: _joi2.default.string().example('australiaeast'),
  hardwareProfile: _joi2.default.object().keys({
    vmSize: _joi2.default.string().example('Standard_D1_v2')
  }),
  storageProfile: _joi2.default.object().keys({
    imageReference: _joi2.default.object({
      publisher: _joi2.default.string().example('MicrosoftWindowsServer'),
      offer: _joi2.default.string().example('WindowsServer'),
      sku: _joi2.default.string().example('2012-R2-Datacenter'),
      version: _joi2.default.string().example('latest')
    }),
    osDisk: _joi2.default.object({
      osType: _joi2.default.string().example('Windows'),
      name: _joi2.default.string().example('NPS-Win-2012'),
      vhd: _joi2.default.object({
        uri: _joi2.default.string().example('https://2342342.blob.core.windows.net/vhds/NPS-Win-201220170324152017.vhd')
      }),
      caching: _joi2.default.string().example('ReadWrite'),
      createOption: _joi2.default.string().example('FromImage')
    }),
    dataDisks: _joi2.default.array()
  }),
  osProfile: _joi2.default.object().keys({
    computerName: _joi2.default.string().example('azure-ubuntu'),
    adminUsername: _joi2.default.string().example('admin'),
    linuxConfiguration: _joi2.default.object(),
    windowsConfiguration: _joi2.default.object(),
    secrets: _joi2.default.array()
  }),
  networkProfile: _joi2.default.object().keys({
    networkInterfaces: _joi2.default.array().items(_joi2.default.object({
      id: _joi2.default.string().example('/subscriptions/0e9d4d28-a996-4873-a0e5-edc324ce5800/resourceGroups/RG/providers/Microsoft.Network/networkInterfaces/nps-win-2012448')
    }))
  }),
  provisioningState: _joi2.default.string().example('Succeeded'),
  vmId: _joi2.default.string().example('225e1110-b047-45e7-b390-a497a25c4b2d'),
  instanceView: _joi2.default.object({
    vmAgent: _joi2.default.object({
      vmAgentVersion: _joi2.default.string().example('2.7.1198.797'),
      extensionHandlers: _joi2.default.array(),
      statuses: _joi2.default.array().items(_joi2.default.object({
        code: _joi2.default.string().example('ProvisioningState/succeeded'),
        level: _joi2.default.string().example('Info'),
        displayStatus: _joi2.default.string().example('Ready'),
        message: _joi2.default.string().example('GuestAgent is running and accepting new configurations.'),
        time: _joi2.default.date().example('2017-04-05T17:05:39.000Z')
      }))
    }),
    disks: _joi2.default.array().items(_joi2.default.object().keys({
      name: _joi2.default.string().example('NPS-Win-2012'),
      statuses: _joi2.default.array().items(_joi2.default.object({
        code: _joi2.default.string().example('ProvisioningState/succeeded'),
        level: _joi2.default.string().example('Info'),
        displayStatus: _joi2.default.string().example('Provisioning succeeded'),
        time: _joi2.default.date().example('2017-03-24T04:21:41.703Z')
      }))
    })),
    statuses: _joi2.default.array().items(_joi2.default.object({
      code: _joi2.default.string(), // 'ProvisioningState/succeeded', 'ProvisioningState/updating', 'PowerState/deallocating'. 'PowerState/deallocated', 'PowerState/starting' PowerState/running'
      level: _joi2.default.string().example('Info'),
      displayStatus: _joi2.default.string().example('Provisioning succeeded'),
      time: _joi2.default.date().example('2017-03-24T04:24:11.990Z')
    }))
  })
};

const listInstancesResponse = exports.listInstancesResponse = _joi2.default.array().items(instanceSchema);