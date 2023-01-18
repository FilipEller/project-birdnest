import {
  getDrones,
  getViolatingDrones,
  updateDrones,
  Drone,
} from './droneService';
import mockDroneApiData from './mockDroneApiData';
import api from '../utils/api';

const mockDrones: Drone[] = [
  {
    serialNumber: 'test-serial-1',
    distance: 158.1,
  },
  {
    serialNumber: 'test-serial-2',
    distance: 70.7,
  },
  {
    serialNumber: 'test-serial-3',
    distance: 291.5,
  },
  {
    serialNumber: 'test-serial-4',
    distance: 58.3,
  },
  {
    serialNumber: 'test-serial-5',
    distance: 104.4,
  },
];

const mockViolatingDrones = mockDrones.filter(
  (drone: Drone) => drone.distance <= 100
);

describe('droneService', () => {
  let spy: jest.SpyInstance<Promise<unknown>, [path: string]>;

  beforeEach(() => {
    spy = jest.spyOn(api, 'fetch');
    spy.mockImplementation(() => Promise.resolve(mockDroneApiData));
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('should initially have empty drones and violatingDrones', () => {
    expect(getDrones()).toHaveLength(0);
    expect(getViolatingDrones()).toHaveLength(0);
  });

  describe('updateDrones', () => {
    beforeEach(async () => {
      await updateDrones();
    });

    it('should set off an API call with the correct path', () => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('drones');
    });

    it('should update drones after updateDrones is called', () => {
      expect(getDrones()).toStrictEqual(mockDrones);
    });

    it('should update violatingDrones after updateDrones is called', () => {
      expect(getViolatingDrones()).toStrictEqual(mockViolatingDrones);
    });
  });
});
