export class Camera {
  id: string;
  name: string;
  ip: string;
  isEnable: boolean;
  custumerId: string;

  constructor(
    id: string,
    name: string,
    ip: string,
    isEnable: boolean,
    custumer_id: string,
  ) {
    if (!this.validateIp(ip)) throw new Error('Invalid IP address');

    this.id = id;
    this.name = name;
    this.ip = ip;
    this.isEnable = isEnable;
    this.custumerId = custumer_id;
  }

  validateIp(ip: string): boolean {
    const ipv4Pattern =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Pattern.test(ip);
  }
}
