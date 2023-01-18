import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { nestLocation, areaSize } from '../utils/constants';

export interface Drone {
  serialNumber: string;
  positionX: number;
  positionY: number;
  distance: number;
}

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function DroneMap({ drones }: { drones: Drone[] }) {
  const data = {
    datasets: [
      {
        label: 'Drone',
        data: drones.map((drone: Drone) => ({
          x: drone.positionX / 1000,
          y: drone.positionY / 1000,
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Nest',
        data: [{ x: nestLocation.x / 1000, y: nestLocation.y / 1000 }],
        backgroundColor: 'rgba(132, 99, 255, 1)',
        pointStyle: 'triangle',
        radius: 10,
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    scales: {
      x: {
        beginAtZero: true,
        max: areaSize.width / 1000,
      },
      y: {
        beginAtZero: true,
        max: areaSize.height / 1000,
      },
    },
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant='h5' component='h2'>
        Drones in the area
      </Typography>
      <Scatter
        data={data}
        options={options}
        data-testid='droneChart'
        id='droneChart'
      />
    </Box>
  );
}

export default memo(DroneMap);
