import cluster from 'cluster';
import 'dotenv/config';
import http, {IncomingMessage, ServerResponse} from 'http';
import {getUsers, getUser, User, addUser, updateUser, deleteUser} from './repository';
import {responses, port, parseBody, isUserValid, generateUuid, isIdValid} from './utils';
const numCPUs = 4; // todo

if (cluster.isPrimary && process.env.MULTI === 'true') {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {

  const getUsersController = async (params: string[]) => {
    console.log(process.pid);
    const users = await getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(users));
  };

  const getUserController = async (params: string[]) => {

    console.log(process.pid);
    const userUuid = params[0];
    if (!isIdValid(userUuid)) {
      res.writeHead(responses.ID_NOT_VALID.code, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(responses.ID_NOT_VALID.message));
      return;
    }
    const user = await getUser(userUuid);
    if (!user) {
      res.writeHead(responses.NOT_FOUND.code, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(responses.NOT_FOUND.message));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(user));
  };

  const createUsersController = async (params: string[]) => {
    let userObj: User = await parseBody(req) as User;
    if (!isUserValid(userObj)) {
      res.writeHead(responses.DATA_NOT_VALID.code, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(responses.DATA_NOT_VALID.message));
      return;
    }
    userObj.id = generateUuid();
    await addUser(userObj);
    res.writeHead(200, { 'Content-Type': 'application/json' });
  };

  const updateUsersController = async (params: string[]) => {
    const userUuid = params[0];
    if (!isIdValid(userUuid)) {
      res.writeHead(responses.ID_NOT_VALID.code, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(responses.ID_NOT_VALID.message));
      return;
    }

    const user = await getUser(userUuid);
    if (!user) {
      res.writeHead(responses.NOT_FOUND.code, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(responses.NOT_FOUND.message));
      return;
    }

    let updateObj: User = await parseBody(req) as User;
    if (!isUserValid(updateObj)) {
      res.writeHead(responses.DATA_NOT_VALID.code, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(responses.DATA_NOT_VALID.message));
      return;
    }

    await updateUser(await getUser(userUuid), updateObj);
    res.writeHead(200, { 'Content-Type': 'application/json' });
  };

  const deleteUsersController = async (params: string[]) => {
    console.log("here");
    const userUuid = params[0];
    if (!isIdValid(userUuid)) {
      res.writeHead(responses.ID_NOT_VALID.code, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(responses.ID_NOT_VALID.message));
      return;
    }

    const user = await getUser(userUuid);
    if (!user) {
      res.writeHead(responses.NOT_FOUND.code, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(responses.NOT_FOUND.message));
      return;
    }

    await deleteUser(userUuid);
    res.writeHead(204, { 'Content-Type': 'application/json' });
  };

  const routes = [
    {
      method: 'GET',
      route: /api\/users\/?$/,
      callback: getUsersController,
    },
    {
      method: 'GET',
      route: /api\/users\/([^/]+)\/?$/,
      callback: getUserController,
    },
    {
      method: 'POST',
      route: /api\/users\/?$/,
      callback: createUsersController,
    },
    {
      method: 'PUT',
      route: /api\/users\/([^/]+)\/?$/,
      callback: updateUsersController,
    },
    {
      method: 'DELETE',
      route: /api\/users\/([^/]+)\/?$/,
      callback: deleteUsersController,
    },
  ];

  const { url, method } = req;

  try {
    const userRoute = routes.find((route) => {
      if (route.method !== method) {
        return false;
      }

      if (!route.route.exec(url)) {
        return false;
      }

      return true;
    });

    console.log({ userRoute, url });

    if (!userRoute) {
      res.writeHead(responses.NOT_FOUND.code, { 'Content-Type': 'application/json' });
      res.write(responses.NOT_FOUND.message);
      res.end();
      return;
    }

    const params = [...userRoute.route.exec(url)];
    params.shift();

    await userRoute.callback(params);
    res.end();
  } catch(e) {
    res.writeHead(responses.SERVER_ERROR.code, { 'Content-Type': 'application/json' });
    res.write(responses.SERVER_ERROR.message);
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}. Go to http://localhost:${port}/`);
});

}
