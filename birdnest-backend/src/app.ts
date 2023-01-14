import express from 'express';
import { drones } from './services/droneService';
import { pilots } from './services/pilotService';
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
  return res.json(drones);
});

app.get('/api/pilots', (_req, res) => {
  return res.json(pilots);
});

export default app;
