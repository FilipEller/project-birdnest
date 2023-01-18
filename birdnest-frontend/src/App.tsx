import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import PilotList from './components/PilotList';
import DroneMap, { Drone } from './components/DroneMap';
import { Pilot } from './components/PilotInfo';
import { Typography } from '@mui/material';

interface ServerToClientEvents {
  update: (pilots: Pilot[], drones: Drone[]) => void;
}

const { NODE_ENV } = process.env;

const socket: Socket<ServerToClientEvents, object> =
  NODE_ENV === 'production' ? io() : io('http://localhost:3001');

const App = () => {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [drones, setDrones] = useState<Drone[]>([]);

  useEffect(() => {
    socket.on('update', (pilots: Pilot[], drones: Drone[]) => {
      setPilots(pilots);
      setDrones(drones);
    });

    return () => {
      socket.off('update');
    };
  }, []);

  return (
    <Container className='App' maxWidth='lg'>
      <Typography variant='h3' component='h1' sx={{ textAlign: 'center' }}>
        Birdnest
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
        }}>
        <DroneMap drones={drones} />
        {<PilotList pilots={pilots} />}
      </Box>
    </Container>
  );
};

export default App;
