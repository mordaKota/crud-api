export interface User {
  id: string,
  username: string,
  age: number,
  hobbies: Array<string>
}

const users: User[] = [
  { id: '893e6c5a-41af-4f28-ad8c-cd92e1939e54', username: 'Misha', age: 1, hobbies: ['bike', 'cats'] },
  { id: '893e6c5a-41af-4f28-ad8c-cd92e1939e45', username: 'Katya', age: 100, hobbies: ['bike', 'cats'] },
];

export const getUsers = async (): Promise<User[]> => users;

export const getUser = async (userUuid: string): Promise<User> => users.find((candidate) => candidate.id === userUuid);

