import * as awsx from "@pulumi/awsx";

export const vpc = new awsx.ec2.Vpc("bastion-vpc", {
  numberOfAvailabilityZones: 2,
  numberOfNatGateways: 1,
  tags: {
    Name: "bastion-vpc"
  }
});
