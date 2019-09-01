import { bastionInstance } from "./bastion";
import { privateDb } from "./database";

const resources = {
  privateDb,
  bastionInstance
};

export const bastionIP = bastionInstance.publicIp;
