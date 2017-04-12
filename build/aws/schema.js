'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.awsOptionsSchema = exports.startInstancesResponse = exports.stopInstancesResponse = exports.listInstancesResponse = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * State codes
        0 : pending
        16 : running
        32 : shutting-down
        48 : terminated
        64 : stopping
        80 : stopped
 */

const instanceSchema = _joi2.default.object().keys({
  InstanceId: _joi2.default.string(),
  ImageId: _joi2.default.string(),
  State: _joi2.default.object().keys({
    Code: _joi2.default.number().example(80),
    Name: _joi2.default.string().example('stopped')
  }),
  PrivateDnsName: _joi2.default.string(),
  PublicDnsName: _joi2.default.string().allow(''),
  StateTransitionReason: _joi2.default.string().allow(''),
  KeyName: _joi2.default.string(),
  AmiLaunchIndex: _joi2.default.number(),
  ProductCodes: _joi2.default.array(),
  InstanceType: _joi2.default.string(),
  LaunchTime: _joi2.default.date(),
  Placement: _joi2.default.object().keys({
    AvailabilityZone: _joi2.default.string(),
    GroupName: _joi2.default.string().allow(''),
    Tenancy: _joi2.default.string()
  }),
  StateReason: _joi2.default.object().keys({
    Code: _joi2.default.string().example('Client.UserInitiatedShutdown'),
    Message: _joi2.default.string().example('Client.UserInitiatedShutdown: User initiated shutdown')
  }),
  Monitoring: _joi2.default.object().keys({
    State: _joi2.default.string()
  }),
  SubnetId: _joi2.default.string(),
  VpcId: _joi2.default.string(),
  PrivateIpAddress: _joi2.default.string(),
  PublicIpAddress: _joi2.default.string(),
  Architecture: _joi2.default.string(),
  RootDeviceType: _joi2.default.string(),
  RootDeviceName: _joi2.default.string(),
  BlockDeviceMappings: _joi2.default.array().items(_joi2.default.object().keys({
    DeviceName: _joi2.default.string(),
    Ebs: _joi2.default.object().keys({
      VolumeId: _joi2.default.string(),
      Status: _joi2.default.string(),
      AttachTime: _joi2.default.date(),
      DeleteOnTermination: _joi2.default.bool()
    })
  })),
  VirtualizationType: _joi2.default.string(),
  ClientToken: _joi2.default.string(),
  Tags: _joi2.default.array().items(_joi2.default.string()),
  SecurityGroups: _joi2.default.array().items(_joi2.default.object().keys({
    GroupName: _joi2.default.string().allow(''),
    GroupId: _joi2.default.string()
  })),
  SourceDestCheck: _joi2.default.bool(),
  Hypervisor: _joi2.default.string(),
  EbsOptimized: _joi2.default.bool(),
  NetworkInterfaces: _joi2.default.array().items(_joi2.default.object().keys({
    NetworkInterfaceId: _joi2.default.string(),
    SubnetId: _joi2.default.string(),
    VpcId: _joi2.default.string(),
    Description: _joi2.default.string().allow(''),
    OwnerId: _joi2.default.string(),
    Status: _joi2.default.string(),
    MacAddress: _joi2.default.string(),
    PrivateIpAddress: _joi2.default.string(),
    PrivateDnsName: _joi2.default.string(),
    SourceDestCheck: _joi2.default.bool(),
    Groups: _joi2.default.array().items(_joi2.default.object().keys({
      GroupName: _joi2.default.string().allow(''),
      GroupId: _joi2.default.string()
    })),
    Attachment: _joi2.default.object().keys({
      AttachmentId: _joi2.default.string(),
      DeviceIndex: _joi2.default.number(),
      Status: _joi2.default.string(),
      AttachTime: _joi2.default.date(),
      DeleteOnTermination: _joi2.default.bool()
    }),
    Association: _joi2.default.object().keys({
      PublicIp: _joi2.default.string(),
      PublicDnsName: _joi2.default.string().allow(''),
      IpOwnerId: _joi2.default.string()
    }),
    PrivateIpAddresses: _joi2.default.array().items(_joi2.default.object().keys({
      PrivateIpAddress: _joi2.default.string(),
      PrivateDnsName: _joi2.default.string(),
      Primary: _joi2.default.bool(),
      Association: {
        PublicIp: _joi2.default.string(),
        PublicDnsName: _joi2.default.string().allow(''),
        IpOwnerId: _joi2.default.string()
      }
    })),
    Ipv6Addresses: _joi2.default.array()
  })),
  EnaSupport: _joi2.default.bool()
});

const listInstancesResponse = exports.listInstancesResponse = _joi2.default.object().keys({
  Reservations: _joi2.default.array().items(_joi2.default.object().keys({
    ReservationId: _joi2.default.string(),
    OwnerId: _joi2.default.string(),
    Groups: _joi2.default.array(),
    Instances: _joi2.default.array().items(instanceSchema),
    EbsOptimized: _joi2.default.bool()
  }))
});

const stopInstancesResponse = exports.stopInstancesResponse = _joi2.default.object().keys({
  StoppingInstances: _joi2.default.array().items(_joi2.default.object().keys({
    InstanceId: _joi2.default.string(),
    CurrentState: _joi2.default.object().keys({
      Code: _joi2.default.number(),
      Name: _joi2.default.string()
    }),
    PreviousState: _joi2.default.object().keys({
      Code: _joi2.default.number(),
      Name: _joi2.default.string()
    })
  }))
});

const startInstancesResponse = exports.startInstancesResponse = _joi2.default.object().keys({
  StartingInstances: _joi2.default.array().items(_joi2.default.object().keys({
    InstanceId: _joi2.default.string(),
    CurrentState: _joi2.default.object().keys({
      Code: _joi2.default.number(), // 0 - pending; 80 - stopped
      Name: _joi2.default.string()
    }),
    PreviousState: _joi2.default.object().keys({
      Code: _joi2.default.number(),
      Name: _joi2.default.string()
    })
  }))
});

const awsOptionsSchema = exports.awsOptionsSchema = {
  accessKeyId: _joi2.default.string().required(),
  secretAccessKey: _joi2.default.string().required(),
  apiVersion: _joi2.default.string(),
  region: _joi2.default.string()
};