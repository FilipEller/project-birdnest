import { memo } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const PilotList = ({ pilots }: { pilots: Pilot[] }) => {
  return (
    <div>
      <Typography variant='h5' component='h2'>
        Violating pilots
      </Typography>
      <Typography variant='body1' component='p'>
        These pilots have violated the NDZ perimeter within the last 10 minutes.
      </Typography>
      {pilots.map((pilot: Pilot) => (
        <Accordion key={pilot.pilotId}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='pilot-list-content'
            id='pilot-list-header'>
            <Typography>{`${pilot.firstName} ${pilot.lastName}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography>{pilot.email}</Typography>
              <Typography>{pilot.phoneNumber}</Typography>
              <Typography>
                Violated at:{' '}
                {new Intl.DateTimeFormat('en-UK', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                }).format(pilot.lastViolation)}
              </Typography>
              <Typography>
                Closest distance to nest: {pilot.closestDistance} m
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default memo(PilotList);
