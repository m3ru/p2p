import http from 'http';
import Gun from 'gun';

const port = 3000; // or any port you like

const server = http.createServer((req, res) => {
  res.end('GUN relay peer running');
});

const gun = Gun({ web: server });

server.listen(port, () => {
  console.log(`GUN server running at http://localhost:${port}/`);
});
