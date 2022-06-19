export interface User {
  id: string,
  username: string,
  age: number,
  hobbies: Array<string>
}

const users: User[] = [];

export const getUsers = async (): Promise<User[]> => users;

export const getUser = async (userUuid: string): Promise<User> => users.find((candidate) => candidate.id === userUuid);

export const addUser = async (userObj: User): Promise<void> => { users.push(userObj) };

export const updateUser = async (foundUser: User, updateObj: User): Promise<void> => {
  foundUser.username = updateObj.username;
  foundUser.age = updateObj.age;
  foundUser.hobbies = updateObj.hobbies;
};

export const deleteUser = async (userUuid: string): Promise<void> => {
 // users = users.filter(u => u.id !== userUuid);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userUuid) {
      users.splice(i, 1);
    }
  }
};
