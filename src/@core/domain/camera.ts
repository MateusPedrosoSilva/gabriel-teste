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
    this.id = id;
    this.name = name;
    this.ip = ip;
    this.isEnable = isEnable;
    this.custumerId = custumer_id;
  }
}
