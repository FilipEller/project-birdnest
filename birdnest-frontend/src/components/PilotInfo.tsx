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

const PilotInfo = ({ pilot }: { pilot: Pilot }) => {
  return (
    <Accordion sx={{ minWidth: 900 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='pilot-info'
        id='pilot-info-header'
        data-testid='pilot-info-header'>
        <Typography>{`${pilot.firstName} ${pilot.lastName}`}</Typography>
      </AccordionSummary>
      <AccordionDetails data-testid='pilot-info-details'>
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
  );
};

export default memo(PilotInfo);
