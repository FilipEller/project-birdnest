import express from 'express';
import schedule from 'node-schedule';
import { drones, updateDrones } from './services/droneService';
import {
  addViolatingPilots,
  removeObsoletePilots,
  pilots,
} from './services/pilotService';

const app = express();
app.use(express.json());
app.use(express.static('build-ui'));

const PORT = 3001;

schedule.scheduleJob('*/2 * * * * *', async () => {
  console.log('running scheduled task');
  await updateDrones();
  await addViolatingPilots();
  removeObsoletePilots();
});

app.get('/api', (_req, res) => {
  res.send('ok');
});

app.get('/api/drones', (_req, res) => {
  return res.json(drones);
});

app.get('/api/pilots', (_req, res) => {
  return res.json(pilots);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
