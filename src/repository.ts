import { User } from './User';

const users: User[] = [
  { id: '1', username: 'Misha', age: 1, hobbies: ['bike', 'cats'] },
];

const getUsers = (): User[] => users;

export default {
  getAll: getUsers(),
};

