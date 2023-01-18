import {
  getPilots,
  fetchPilot,
  updateViolatingPilots,
  RawPilot,
  Pilot,
} from './pilotService';
import api from '../utils/api';
import * as droneService from './droneService';
import { Drone } from './droneService';

const mockDrones: Drone[] = [
  {
    serialNumber: 'test-serial-0',
    distance: 70.7,
    positionX: 10,
    positionY: 10,
  },
  {
    serialNumber: 'test-serial-1',
    distance: 58.3,
    positionX: 20,
    positionY: 30,
  },
];

const mockRawPilots: RawPilot[] = [
  {
    pilotId: '0',
    firstName: 'test-first-name-0',
    lastName: 'test-last-name-0',
    email: 'test-email-0',
    phoneNumber: 'test-phone-number-0',
  },
  {
    pilotId: '1',
    firstName: 'test-first-name-1',
    lastName: 'test-last-name-1',
    email: 'test-email-1',
    phoneNumber: 'test-phone-number-1',
  },
];

const mockPilots: Pilot[] = [
  {
    pilotId: '0',
    firstName: 'test-first-name-0',
    lastName: 'test-last-name-0',
    email: 'test-email-0',
    phoneNumber: 'test-phone-number-0',
    droneSerialNumber: 'test-serial-0',
    lastViolation: 100,
    closestDistance: 70.7,
  },
  {
    pilotId: '1',
    firstName: 'test-first-name-1',
    lastName: 'test-last-name-1',
    email: 'test-email-1',
    phoneNumber: 'test-phone-number-1',
    droneSerialNumber: 'test-serial-1',
    lastViolation: 100,
    closestDistance: 58.3,
  },
];

describe('pilotService', () => {
  let apiSpy: jest.SpyInstance<Promise<unknown>, [path: string]>;
  let droneServiceSpy: jest.SpyInstance<Drone[], []>;

  beforeEach(() => {
    apiSpy = jest.spyOn(api, 'fetch');
    apiSpy.mockImplementation((path: string) =>
      Promise.resolve(
        path.endsWith('test-serial-0') ? mockRawPilots[0] : mockRawPilots[1]
      )
    );
    droneServiceSpy = jest.spyOn(droneService, 'getViolatingDrones');
    droneServiceSpy.mockImplementation(() => mockDrones);
  });

  afterEach(() => {
    apiSpy.mockRestore();
    droneServiceSpy.mockRestore();
  });

  it('should initially have empty pilots', () => {
    expect(getPilots()).toHaveLength(0);
  });

  describe('fetchPilot', () => {
    it('should set off an API call with the correct path', async () => {
      await fetchPilot('test-serial-1', 100, 58.3);
      expect(apiSpy).toHaveBeenCalledTimes(1);
      expect(apiSpy).toHaveBeenCalledWith('pilots/test-serial-1');
    });

    it('should return the correct pilot', async () => {
      const result = await fetchPilot('test-serial-1', 100, 58.3);
      expect(result).toStrictEqual({
        ...mockPilots[1],
      });
    });
  });

  describe('updateViolatingPilots', () => {
    beforeEach(async () => {
      await updateViolatingPilots();
    });
    it('should set off API calls with the correct paths', () => {
      expect(droneServiceSpy).toHaveBeenCalledTimes(1);
      expect(apiSpy).toHaveBeenCalledTimes(2);
      expect(apiSpy).toHaveBeenCalledWith('pilots/test-serial-0');
      expect(apiSpy).toHaveBeenCalledWith('pilots/test-serial-1');
    });

    it('should add new pilots', () => {
      expect(
        getPilots().map((pilot: Pilot) => ({ ...pilot, lastViolation: 100 }))
      ).toStrictEqual(mockPilots);
    });
  });
});
