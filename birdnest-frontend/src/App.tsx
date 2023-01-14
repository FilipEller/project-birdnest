import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import PilotList, { Pilot } from './components/PilotList';
import { Typography } from '@mui/material';

interface ServerToClientEvents {
  pilotUpdate: (pilots: Pilot[]) => void;
}

const { NODE_ENV } = process.env;

const socket: Socket<ServerToClientEvents, object> =
  NODE_ENV === 'production' ? io() : io('http://localhost:3001');

const App = () => {
  const [pilots, setPilots] = useState<Pilot[]>([]); // eslint-disable-line

  useEffect(() => {
    socket.on('pilotUpdate', (pilots: Pilot[]) => {
      setPilots(pilots);
    });

    return () => {
      socket.off('pilotUpdate');
    };
  }, []);

  return (
    <div className='App'>
      <Typography variant='h3' component='h1'>
        Birdnest
      </Typography>
      <div>{<PilotList pilots={pilots} />}</div>
    </div>
  );
};

export default App;
