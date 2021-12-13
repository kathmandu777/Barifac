export class Session {
  public constructor(readonly token: string, readonly expiration: number) {}

  public get isExpired() {
    const now = new Date().getTime();
    return this.expiration < now;
  }
}
