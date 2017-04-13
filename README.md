makeen-vm
==========
Makeen plugin for managing AWS and Azure virtual machines.

The plugin requires the following options to be passed during registration:

```js
{
  "awsCredentials": {
    "apiVersion": "",
    "region": "",
    "accessKeyId": "",
    "secretAccessKey": ""
  },
  "azureCredentials": {
    "key": "",
    "appId": "",
    "tenantId": "",
    "subscriptionId": "",
    "user": "",
    "password": ""
  }
}
```

If aws or azure field is missing altogether then the respective cloud provider is skipped.

If proper credentials are being past then the plugin will expose REST endpoints to list, start and stop cloud (AWS and Azure) virtual machines:
![](assets/makeen_vm_routes.png?raw=true)