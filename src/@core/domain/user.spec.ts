import { User } from './user';
import { v4 as uuidv4 } from 'uuid';

describe('User Unit Test', () => {
  it('should create a new user', () => {
    const id = uuidv4();
    const name = 'Mateus Pedroso';
    const user = new User(id, name);
    expect(user.id).toBe(id);
    expect(user.name).toBe(name);
  });
});
