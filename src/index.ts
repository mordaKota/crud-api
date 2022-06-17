import http from 'http';
import repo from './repository';

console.log('http', http );

const server = http.createServer((req, res) => {

  if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(repo.getAll));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<img src="https://http.cat/404.jpg" alt="Route Not Found">');
  }

  res.end();
});

const port = process.env.PORT || 3033;
server.listen(port, () => {
  console.log(`Server is running on port ${3033}. Go to http://localhost:3033/`);
});
