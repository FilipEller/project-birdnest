import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  pilotUpdate: (pilots: Pilot[]) => void;
}
export interface Pilot {
  pilotId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  droneSerialNumber: string;
  lastViolation: number;
  closestDistance: number;
}

const socket: Socket<ServerToClientEvents, object> = io();

const App = () => {
  const [pilots, setPilots] = useState<Pilot[]>([]); // eslint-disable-line
  useEffect(() => {
    const fetchPilots = async () => {
      const response = await axios.get('http://localhost:8080/api/pilots');
      console.log({ response });
      if (response?.data) {
        setPilots(response?.data); // eslint-disable-line
      }
    };
    void fetchPilots();
  }, []);

  useEffect(() => {
    socket.on('pilotUpdate', (pilots: Pilot[]) => {
      console.log('new update');
      setPilots(pilots);
    });

    return () => {
      socket.off('pilotUpdate');
    };
  }, []);

  return (
    <div className='App'>
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <div>
        pilots:
        {pilots.map((pilot: Pilot) => (
          <div key={pilot.pilotId}>{`${String(pilot.firstName)} ${String(
            pilot.lastName
          )}`}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
