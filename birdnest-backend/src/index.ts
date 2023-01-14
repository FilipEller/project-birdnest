import express from 'express';
import schedule from 'node-schedule';
import { drones, updateDrones } from './services/droneService';
import {
  addViolatingPilots,
  removeObsoletePilots,
  pilots,
  Pilot,
} from './services/pilotService';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import http from 'http';
const httpServer = http.createServer(app);
import { Server } from 'socket.io';

interface ServerToClientEvents {
  pilotUpdate: (pilots: Pilot[]) => void;
}

const io = new Server<object, ServerToClientEvents, object, object>(httpServer);

const PORT = 3001;

schedule.scheduleJob('*/2 * * * * *', async () => {
  console.log('running scheduled task');
  await updateDrones();
  await addViolatingPilots();
  removeObsoletePilots();
  io.emit('pilotUpdate', pilots);
});

io.on('connection', _socket => {
  console.log('a user connected');
});

app.get('/', (_req, res) => {
  res.send('ok');
});

app.get('/drones', (_req, res) => {
  return res.json(drones);
});

app.get('/pilots', (_req, res) => {
  return res.json(pilots);
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
