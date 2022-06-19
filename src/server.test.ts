import server from "./server";
import axios from "axios";
import {addUser, deleteUser, getUsers, User} from "./repository";
import {assert} from "chai";
import {parseBody} from "./utils";

const port = 5000;

const testUser: User = {
    id: 'b6ea97ac-ef05-11ec-8ea0-0242ac120002',
    username: 'Lori',
    age: 23,
    hobbies: ['bike', 'cats'],
}

const testUser2: Omit<User, 'id'> = {
    username: 'Lori',
    age: 23,
    hobbies: ['bike', 'cats'],
}

describe('REST API', () => {
    before(() => {
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })

    after(function () {
        server.close();
    });

    it('Server method index is working', async () => {
        await addUser(testUser);
        const { data, status } = await axios.get(`http://localhost:${port}/api/users`);

        assert.equal(status, 200);
        assert.typeOf(data, 'array');
        assert.lengthOf(data, 1);
        assert.equal(data[0].id, testUser.id);

        await deleteUser(testUser.id);
    });
    it('Create user method is working', async () => {
        const { data, status } = await axios.post(`http://localhost:${port}/api/users`, testUser2);
        assert.equal(status, 200);
        assert.typeOf(data.id, 'string');
        assert.equal(data.age, 23);
        assert.lengthOf(data.hobbies, 2);
        assert.equal(data.username, 'Lori');
        await deleteUser(data.id);
    });
    it('Delete user method is working', async () => {
        await addUser(testUser);
        const { data, status } = await axios.delete(`http://localhost:${port}/api/users/${testUser.id}`);
        assert.lengthOf(await getUsers(), 0);
    })
});