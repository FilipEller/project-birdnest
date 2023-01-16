import schedule from 'node-schedule';
import { drones, updateDrones, Drone } from './services/droneService';
import {
  addViolatingPilots,
  removeObsoletePilots,
  pilots,
  Pilot,
} from './services/pilotService';
import { PORT, NODE_ENV } from './utils/config';
import app from './app';

import http from 'http';
const httpServer = http.createServer(app);
import { Server } from 'socket.io';

interface ServerToClientEvents {
  update: (pilots: Pilot[], drones: Drone[]) => void;
}

const io = new Server<object, ServerToClientEvents, object, object>(
  httpServer,
  NODE_ENV === 'production' ? {} : { cors: { origin: 'http://localhost:3000' } }
);

schedule.scheduleJob('*/2 * * * * *', async () => {
  console.log('running scheduled task');
  await updateDrones();
  await addViolatingPilots();
  removeObsoletePilots();
  io.emit('update', pilots, drones);
});

io.on('connection', _socket => {
  console.log('a user connected');
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
