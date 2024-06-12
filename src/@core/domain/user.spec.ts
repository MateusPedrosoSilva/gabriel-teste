import { User } from './user';

describe('User Unit Test', () => {
  it('should create a new user', () => {
    const user = new User('123', 'user-1');
    expect(user.id).toBe('123');
    expect(user.name).toBe('user-1');
  });
});
