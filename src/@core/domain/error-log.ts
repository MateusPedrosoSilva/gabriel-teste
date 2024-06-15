export class ErrorLog {
  id: string;
  occurred_at: Date;
  camera_id: string;

  constructor(id: string, occurred_at: Date, camera_id: string) {
    this.id = id;
    this.occurred_at = occurred_at;
    this.camera_id = camera_id;
  }
}
