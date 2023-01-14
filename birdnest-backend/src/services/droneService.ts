import axios from 'axios';
import parser from 'xml2js';
import * as yup from 'yup';
import isString from '../utils/isString';

export interface Drone {
  serialNumber: string;
  positionX: number;
  positionY: number;
}

const droneSchema = yup.object().shape({
  serialNumber: yup.string().required(),
  positionX: yup.number().min(0).max(500000).required(),
  positionY: yup.number().min(0).max(500000).required(),
});

const droneArraySchema = yup.array().of(droneSchema);

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
          drones = jsonDrones.map(drone => {
            const { serialNumber, positionX, positionY } = drone;
            return { serialNumber, positionX, positionY };
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
