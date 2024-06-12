export class ErrorLog {
  id: string;
  occurred_At: Date;
  cameda_id: string;

  constructor(id: string, occurred_at: Date, camera_id: string) {
    this.id = id;
    this.occurred_At = occurred_at;
    this.cameda_id = camera_id;
  }
}
