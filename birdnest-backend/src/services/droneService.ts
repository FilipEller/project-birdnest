import axios from 'axios';
import parser from 'xml2js';
import * as yup from 'yup';
import isString from '../utils/isString';
import distanceFromNest from '../utils/distanceFromNest';

export interface Drone {
  serialNumber: string;
  positionX: number;
  positionY: number;
  distance: number;
}
export interface RawDrone {
  serialNumber: string;
  positionX: number;
  positionY: number;
}

export let drones: Drone[] = [];
export let violatingDrones: Drone[] = [];

export const updateDrones = async () => {
  const newDrones = await fetchDrones();
  if (newDrones) {
    drones = newDrones;
    violatingDrones = newDrones.filter((drone: Drone) => drone.distance <= 100);
  }
};

const rawDroneSchema = yup.object().shape({
  serialNumber: yup.string().required(),
  positionX: yup.number().min(0).max(500000).required(),
  positionY: yup.number().min(0).max(500000).required(),
});

const droneArraySchema = yup.array().of(rawDroneSchema);

export const fetchDrones = async (): Promise<Drone[] | null> => {
  try {
    let drones: Drone[] = [];
    const monitoringResponse = await axios.get(
      'http://assignments.reaktor.com/birdnest/drones'
    );
    if (!monitoringResponse?.data || !isString(monitoringResponse?.data)) {
      return null;
    }

    parser.parseString(
      monitoringResponse.data,
      { explicitArray: false },
      (err, json) => {
        if (err) {
          return;
        }
        const jsonDrones: unknown = json?.report?.capture?.drone;
        if (jsonDrones && droneArraySchema.isValidSync(jsonDrones)) {
          drones = jsonDrones.map((drone: RawDrone) => {
            const { serialNumber, positionX, positionY } = drone;
            const distance = distanceFromNest(positionX, positionY);
            return { serialNumber, positionX, positionY, distance };
          });
        }
      }
    );

    return drones;
  } catch (err) {
    console.log(err);
    return null;
  }
};
