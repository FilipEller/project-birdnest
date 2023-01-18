import express from 'express';
import { getDrones } from './services/droneService';
import { getPilots } from './services/pilotService';
import cors from 'cors';
import morgan from 'morgan';
import { NODE_ENV } from './utils/config';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build-ui'));
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api', (_req, res) => {
  res.send('ok');
});

app.get('/api/drones', (_req, res) => {
  return res.json(getDrones());
});

app.get('/api/pilots', (_req, res) => {
  return res.json(getPilots());
});

app.use('/*', (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
});

export default app;
