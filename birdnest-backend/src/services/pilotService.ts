import axios from 'axios';
import * as yup from 'yup';
import { tenMinutesInMilliseconds } from '../constants';
import { violatingDrones } from './droneService';

export interface RawPilot {
  pilotId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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

const rawPilotSchema = yup.object().shape({
  pilotId: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  phoneNumber: yup.string().required(),
});

export let pilots: Pilot[] = [];

export const addViolatingPilots = async () => {
  const currentTime = Date.now();

  for (let i = 0; i < violatingDrones.length; i++) {
    const drone = violatingDrones[i];
    const knownPilot = pilots.find(
      (pilot: Pilot) => pilot.droneSerialNumber === drone.serialNumber
    );

    if (knownPilot) {
      knownPilot.lastViolation = currentTime;
      if (drone.distance < knownPilot.closestDistance) {
        knownPilot.closestDistance = drone.distance;
      }
    } else {
      const newPilot = await fetchPilot(
        drone.serialNumber,
        currentTime,
        drone.distance
      );
      if (newPilot) {
        pilots.push(newPilot);
      }
    }
  }
};

export const removeObsoletePilots = () => {
  const currentTime = Date.now();
  pilots = pilots.filter(
    (pilot: Pilot) =>
      currentTime - pilot.lastViolation <= tenMinutesInMilliseconds
  );
};

export const fetchPilot = async (
  serialNumber: string,
  lastViolation: number,
  closestDistance: number
): Promise<Pilot | null> => {
  try {
    const pilotResponse = await axios.get(
      `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`
    );

    const pilotData: unknown = pilotResponse?.data;

    if (rawPilotSchema.isValidSync(pilotData)) {
      const { pilotId, firstName, lastName, email, phoneNumber } = pilotData;
      return {
        pilotId,
        firstName,
        lastName,
        email,
        phoneNumber,
        droneSerialNumber: serialNumber,
        lastViolation,
        closestDistance,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
