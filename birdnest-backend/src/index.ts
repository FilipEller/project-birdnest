import schedule from 'node-schedule';
import { updateDrones } from './services/droneService';
import {
  updateViolatingPilots,
  removeObsoletePilots,
  getPilots,
  Pilot,
} from './services/pilotService';
import { PORT, NODE_ENV } from './utils/config';
import app from './app';

import http from 'http';
const httpServer = http.createServer(app);
import { Server } from 'socket.io';

interface ServerToClientEvents {
  pilotUpdate: (pilots: Pilot[]) => void;
}

const io = new Server<object, ServerToClientEvents, object, object>(
  httpServer,
  NODE_ENV === 'production' ? {} : { cors: { origin: 'http://localhost:3000' } }
);

schedule.scheduleJob('*/2 * * * * *', async () => {
  await updateDrones();
  await updateViolatingPilots();
  removeObsoletePilots();
  io.emit('pilotUpdate', getPilots());
});

io.on('connection', _socket => {
  console.log('a user connected');
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
