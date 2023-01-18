import { memo, useMemo } from 'react';
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
import { nestLocation, areaSize, ndzRadius } from '../utils/constants';

export interface Drone {
  serialNumber: string;
  positionX: number;
  positionY: number;
  distance: number;
}

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const DroneMap = ({ drones }: { drones: Drone[] }) => {
  const numPoints = 50;
  const ndzPerimeter = useMemo(
    () =>
      Array.from({ length: numPoints }, (_, index) => {
        const angle = (index * 2 * Math.PI) / numPoints;
        return {
          x: (ndzRadius * Math.cos(angle) + nestLocation.x) / 1000,
          y: (ndzRadius * Math.sin(angle) + nestLocation.y) / 1000,
        };
      }),
    []
  );

  const data = {
    datasets: [
      {
        label: 'Drone',
        data: drones.map((drone: Drone) => ({
          x: drone.positionX / 1000,
          y: drone.positionY / 1000,
        })),
        backgroundColor: 'rgba(130, 164, 1)',
      },
      {
        label: 'Nest',
        data: [{ x: nestLocation.x / 1000, y: nestLocation.y / 1000 }],
        backgroundColor: 'rgba(132, 99, 255, 1)',
        pointStyle: 'triangle',
        radius: 10,
      },
      {
        label: 'No-Drone-Zone',
        data: ndzPerimeter,
        backgroundColor: 'rgba(220, 99, 126, 1)',
        radius: 1,
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    scales: {
      x: {
        beginAtZero: true,
        max: areaSize.width / 1000,
        ticks: {
          stepSize: 50,
        },
      },
      y: {
        beginAtZero: true,
        max: areaSize.height / 1000,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  return (
    <Box
      sx={{
        minWidth: '70%',
        padding: '15px',
      }}>
      <Typography variant='h5' component='h2' sx={{ textAlign: 'center' }}>
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
};

export default memo(DroneMap);
