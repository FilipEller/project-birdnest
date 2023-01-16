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
        data: [{ x: 250, y: 250 }],
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
        max: 500,
      },
      y: {
        beginAtZero: true,
        max: 500,
      },
    },
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant='h5' component='h2'>
        Drones in the area
      </Typography>
      <Scatter data={data} options={options} />
    </Box>
  );
}

export default memo(DroneMap);
