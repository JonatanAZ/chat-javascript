import app from './app';
import http from 'http';
import './database';
import { Server } from 'socket.io';
import sockets from './sockets';

const server=http.createServer(app);
const io= new Server(server);

sockets(io);

server.listen(app.get('port'));
console.log('Server on port', app.get('port'));