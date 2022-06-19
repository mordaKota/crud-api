import cluster from 'cluster';
import 'dotenv/config';
import { port } from './utils';
import server from "./server";
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary && process.env.MULTI === 'true') {
  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i + 1}...`);
    cluster.fork();
  }
} else {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}. Go to http://localhost:${port}/`);
  });
}
