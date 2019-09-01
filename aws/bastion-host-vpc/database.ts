import * as aws from "@pulumi/aws";
import { vpc } from "./vpc";

const privateDbSubnetGroupName = "private-db-subnet-group";
const privateDbSubnetGroup = new aws.rds.SubnetGroup(privateDbSubnetGroupName, {
  subnetIds: vpc.privateSubnetIds,
  name: privateDbSubnetGroupName
});

export const privateDb = new aws.rds.Instance("private-db", {
  publiclyAccessible: false,
  engine: "postgres",
  engineVersion: "10.7",
  username: "example",
  password: "superSecurePassword12345",
  allocatedStorage: 20,
  instanceClass: "db.t3.micro",
  dbSubnetGroupName: privateDbSubnetGroup.name,
  // vpcSecurityGroupIds: [
  //   postgresSecurityGroup.id,
  //   ...cluster.securityGroups.map(x => x.id)
  // ],
  skipFinalSnapshot: true
});
