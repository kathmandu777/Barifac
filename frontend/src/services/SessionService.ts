import { SessionFactory } from 'domains';
import { noAuthClient } from 'infras/RestClient';
import {
  getStoreToken,
  removeStoreToken,
  setStoreToken,
} from 'infras/TokenStore';

export class SessionService {
  public static build(storedSession: string | null) {
    if (!storedSession) return null;
    const session = SessionFactory.createFromResponseObject(
      JSON.parse(storedSession),
    );
    if (session.isExpired) return null;
    return session;
  }

  static async signin(idToken: string) {
    console.log(process.env.API_ORIGIN);
    const res = await noAuthClient().formURLEncodedPost<{
      access_token: string;
    }>('/api/v1/auth/login/firebase', 'idtoken', idToken);
    this.store(res.data.access_token);
  }

  static store(token: string) {
    const timeOut = Date.now() + 60 * 60 * 24 * 1000;
    const session = SessionFactory.createFromResponseObject({
      token: token,
      expiration: timeOut,
    });
    setStoreToken(session);
  }

  static isLoggedin() {
    const token = getStoreToken();
    if (!token) return false;
    const session = SessionFactory.createFromResponseObject(JSON.parse(token));
    if (session.isExpired) return false;
    return true;
  }

  static signout() {
    removeStoreToken();
  }
}
