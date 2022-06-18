import type { User } from '../repository';

export const testUsers: User[] = [
  {
    id: 'b6ea97ac-ef05-11ec-8ea0-0242ac120002',
    username: 'Lori',
    age: 23,
    hobbies: ['bike', 'cats'],
  },
  {
    id: 'b6ea9978-ef05-11ec-8ea0-0242ac120002',
    username: 'Oldman',
    age: 10000,
    hobbies: ['sleep', 'fishing'],
  },
  {
    id: 'b6ea9475-ef05-11ec-8ea0-0242ac120002',
    username: 'Ghost',
    age: -1,
    hobbies: ['frighten'],
  },
];
