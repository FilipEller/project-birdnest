import express from 'express';
import schedule from 'node-schedule';
import { Drone, fetchDrones } from './services/droneService';

const app = express();
app.use(express.json());

const PORT = 3001;

let drones: Drone[] = [];

schedule.scheduleJob('*/2 * * * * *', async () => {
  console.log('running scheduled');
  const newDrones = await fetchDrones();
  if (newDrones) {
    drones = newDrones;
  }
});

app.get('/', (_req, res) => {
  res.send('ok');
});

app.get('/drones', (_req, res) => {
  return res.json(drones);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
