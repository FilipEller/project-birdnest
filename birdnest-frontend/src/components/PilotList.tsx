import { memo } from 'react';
import { Typography, Box } from '@mui/material';
import PilotDetails, { Pilot } from './PilotInfo';

const PilotList = ({ pilots }: { pilots: Pilot[] }) => {
  return (
    <Box data-testid='pilot-list' sx={{ padding: '15px' }}>
      <Typography variant='h5' component='h2'>
        Violating pilots
      </Typography>
      {pilots.length > 0 ? (
        <>
          <Typography variant='body1' component='p'>
            These pilots have violated the NDZ perimeter within the last 10
            minutes.
          </Typography>
          {pilots.map((pilot: Pilot) => (
            <PilotDetails pilot={pilot} key={pilot.pilotId} />
          ))}
        </>
      ) : (
        <p>No violations within the last 10 minutes.</p>
      )}
    </Box>
  );
};

export default memo(PilotList);
