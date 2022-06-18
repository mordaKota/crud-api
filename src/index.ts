// import cluster from 'cluster';
// import 'dotenv/config';
import http from 'http';
import { getUsers, getUser } from './repository';
import { responses, port } from './utils';
const numCPUs = 4; // todo

// if (cluster.isPrimary && process.env.MULTI === 'true' && false) {
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
// } else {

const server = http.createServer(async (req, res) => {
  // console.log(process.pid);
  console.log('asdsad');
  res.end();

  /*
  const getUsersController = async (params: string[]) => {
    // console.log(process.pid);
    const users = await getUsers();
    res.writeHead(203, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(users));
  };

  const getUserController = async (params: string[]) => {
    const userUuid = params[0];

    // IF NOT VALID UUID => 400

    const user = await getUser(userUuid);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(user));
  };


  const routes = [
    {
      method: 'GET',
      route: /api\/users\/?$/,
      callback: getUsersController,
    },
    {
      method: 'GET',
      // route: /api\/users\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/,
      route: /api\/users\/([^/]+)\/?$/,
      callback: getUserController,
    },
  ];


  const { url, method } = req;

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

   */
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}. Go to http://localhost:3033/`);
});


// }