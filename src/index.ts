import cluster from 'cluster';
import 'dotenv/config';
import { port } from './utils';
import server from "./server";

const numCPUs = 4; // todo

if (cluster.isPrimary && process.env.MULTI === 'true') {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}. Go to http://localhost:${port}/`);
  });
}
