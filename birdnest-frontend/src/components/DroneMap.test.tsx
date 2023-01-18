import { render, screen } from '@testing-library/react';
import DroneMap, { Drone } from './DroneMap';

const mockDrones: Drone[] = [
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

describe('DroneMap', () => {
  it('should render the title', () => {
    render(<DroneMap drones={mockDrones} />);
    expect(screen.getByText(/Drones in the area/i)).toBeVisible();
  });

  it('should render the chart', () => {
    render(<DroneMap drones={mockDrones} />);
    expect(screen.getByText('droneChart')).toBeVisible();
  });
});
