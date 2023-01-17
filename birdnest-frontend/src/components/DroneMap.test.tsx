import { render, screen } from '@testing-library/react';
import DroneMap, { Drone } from './DroneMap';

const mockDronesInside: Drone[] = [
  {
    serialNumber: '0',
    positionX: 0,
    positionY: 0,
    distance: 35,
  },
  {
    serialNumber: '1',
    positionX: 10,
    positionY: 20,
    distance: 135,
  },
  {
    serialNumber: '2',
    positionX: 300,
    positionY: 20,
    distance: 301,
  },
];

const mockDronesOutside: Drone[] = [
  {
    serialNumber: '4',
    positionX: -10,
    positionY: -70,
    distance: 15,
  },
  {
    serialNumber: '5',
    positionX: 700,
    positionY: 900,
    distance: 531,
  },
];

const mockDronesCombined = mockDronesInside.concat(mockDronesOutside);

describe('DroneMap', () => {
  it('should render the title', () => {
    render(<DroneMap drones={mockDronesInside} />);
    expect(screen.getByText(/Drones in the area/i)).toBeVisible();
  });

  it('should render the chart when given drones inside the area', () => {
    render(<DroneMap drones={mockDronesInside} />);
    expect(screen.getByTestId('droneChart')).toBeVisible();
  });

  it('should render the chart when some drones are outside the area', () => {
    render(<DroneMap drones={mockDronesCombined} />);
    expect(screen.getByTestId('droneChart')).toBeVisible();
  });

  it('should render the chart when no drones are in the area', () => {
    render(<DroneMap drones={mockDronesOutside} />);
    expect(screen.getByTestId('droneChart')).toBeVisible();
  });

  it('should render the chart when no drones are given', () => {
    render(<DroneMap drones={[]} />);
    expect(screen.getByTestId('droneChart')).toBeVisible();
  });
});
