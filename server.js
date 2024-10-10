const http = require('http');
const app = require('./app');

const port = 3000 || 3001;

const server = http.createServer(app);

server.listen(port, ()=> {
    console.log(`http://localhost:${port}`);
});