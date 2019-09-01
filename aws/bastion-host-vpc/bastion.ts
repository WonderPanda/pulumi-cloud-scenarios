import * as aws from "@pulumi/aws";
import { vpc } from "./vpc";

const keyPairName = "jesse-desktop-keypair";
const keyPair = new aws.ec2.KeyPair(keyPairName, {
  keyName: keyPairName,
  publicKey:
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC4QblYchoM215mc021BXZBaM4oQLIzG83z7cONThhSo31jP9fDhrb6qeW7ibRQzm7O69qaYlbKoARt0q98+FiWnURtHLBeZeqVvsGYsfZq2lpBsX0kTxoHh1A58qrZGGcMFaFDAeuwNm5uKborpxnL65HzqDDj95ivQyE0nRUmeAybfboj6UEKJgzewtjdEyqzj/CgGmjo2JIs3ad0Ybll/qSP6+K2EgxGN6oJ98CMH/EeTIhDcDkSjF2OmdpIMGuCctFLc0+2YXhyTx/tJImki1p5FTqEOs+JAdptwTerLEPLXjzv6Oxm4zJ/HW5KNlsSjIGDr/n94SJe5uOJ0l1aezT3P6YEwTp1QMOvVQRfa7ZAMxCLrTTpr9Hx0Bevvm0Xjb6ci0Y/xMOl3tMkFz4G/2XTV59zMZqyGt2Qvv0wzAUVYrchBcIsOGFPLkbxwS/W1bmrdNTtcjSoOiFPn7WzeQEmqgYSPb5Dn9RuiljIlGeiH19L/3PKsQgDWRMz4POS7QLhA2eEGIfsn/z2T1dZZTx3SriyAMn4HWnEW+Lx/gZcrP5qM6hvO+w7nYNZcmeDcE1azx6T7pa2kXvVxfRo1jBq4iYquX0WO1b1kh8pHae4sV9EDVwQByIkXfca5Lnonn1j0xzCxJGN5C5+QAOjXSLjNkNxx9Y4HRGDrIAelw== jesse@pop-os"
});

const bastionSecurityGroup = new aws.ec2.SecurityGroup(
  "bastion-security-group",
  {
    vpcId: vpc.id,
    name: "bastion-security-group",
    ingress: [
      {
        protocol: "tcp",
        fromPort: 22,
        toPort: 22,
        cidrBlocks: ["0.0.0.0/0"]
      }
    ],
    egress: [
      {
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"]
      }
    ],
    tags: {
      Name: "Bastion Security Group"
    }
  }
);

export const bastionInstance = new aws.ec2.Instance("bastion-instance", {
  subnetId: vpc.publicSubnetIds[0],
  associatePublicIpAddress: true,
  instanceType: "t2.micro",
  ami: "ami-0b898040803850657",
  tags: {
    Name: "Bastion"
  },
  vpcSecurityGroupIds: [bastionSecurityGroup.id]
});
