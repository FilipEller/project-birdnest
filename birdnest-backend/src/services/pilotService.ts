import * as yup from 'yup';
import api from '../utils/api';
import { tenMinutesInMilliseconds } from '../utils/constants';
import { getViolatingDrones, stringSchema } from './droneService';

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

let pilots: Pilot[] = [];

export const getPilots = (): Pilot[] => pilots;

export const fetchPilot = async (
  serialNumber: string,
  lastViolation: number,
  closestDistance: number
): Promise<Pilot | null> => {
  const pilotData = await api.fetch(`pilots/${serialNumber}`);

  const pilotObject: unknown =
    stringSchema.isValidSync(pilotData) && pilotData
      ? JSON.parse(pilotData)
      : pilotData;

  if (rawPilotSchema.isValidSync(pilotObject)) {
    const { pilotId, firstName, lastName, email, phoneNumber } = pilotObject;
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
};

export const updateViolatingPilots = async () => {
  const currentTime = Date.now();
  const violatingDrones = getViolatingDrones();

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
