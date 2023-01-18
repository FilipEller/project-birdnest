import parser from 'xml2js';
import * as yup from 'yup';
import distanceFromNest from '../utils/distanceFromNest';
import api from '../utils/api';

export interface Drone {
  serialNumber: string;
  distance: number;
}
interface RawDrone {
  serialNumber: string;
  positionX: number;
  positionY: number;
}

const rawDroneSchema = yup.object().shape({
  serialNumber: yup.string().required(),
  positionX: yup.number().min(0).max(500000).required(),
  positionY: yup.number().min(0).max(500000).required(),
});

const droneArraySchema = yup.array().of(rawDroneSchema);

export const stringSchema = yup.string();

let drones: Drone[] = [];
let violatingDrones: Drone[] = [];

export const getDrones = (): Drone[] => drones;
export const getViolatingDrones = (): Drone[] => violatingDrones;

const fetchDrones = async (): Promise<Drone[]> => {
  let drones: Drone[] = [];
  const xmlDrones = await api.fetch('drones');

  if (!xmlDrones || !stringSchema.isValidSync(xmlDrones)) {
    return [];
  }

  parser.parseString(xmlDrones, { explicitArray: false }, (err, json) => {
    if (err) {
      return;
    }
    const jsonDrones: unknown = json?.report?.capture?.drone;
    if (jsonDrones && droneArraySchema.isValidSync(jsonDrones)) {
      drones = jsonDrones.map((drone: RawDrone) => {
        const { serialNumber, positionX, positionY } = drone;
        const distance = distanceFromNest(positionX, positionY);
        return { serialNumber, distance };
      });
    }
  });

  return drones;
};

export const updateDrones = async () => {
  const newDrones = await fetchDrones();
  if (newDrones) {
    drones = newDrones;
    violatingDrones = newDrones.filter((drone: Drone) => drone.distance <= 100);
  }
};
