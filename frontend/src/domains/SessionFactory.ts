import { Session } from 'domains';

export interface SessionObject {
  token: string;
  expiration: number;
}

export class SessionFactory {
  public static createFromResponseObject(obj: SessionObject): Session {
    return new Session(obj.token, obj.expiration);
  }
}
