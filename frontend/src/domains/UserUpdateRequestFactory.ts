import { UserUpdateRequest } from 'domains';

export class UserUpdateRequestFactory {
  static createEmpty() {
    return new UserUpdateRequest('', '', '', 1, '', '');
  }
}
