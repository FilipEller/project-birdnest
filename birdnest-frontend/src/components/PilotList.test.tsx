import { render, screen, within } from '@testing-library/react';
import PilotList from './PilotList';

const mockPilots = [
  {
    pilotId: '0',
    firstName: 'test-first-name-0',
    lastName: 'test-last-name-0',
    email: 'test-email-0',
    phoneNumber: 'test-phone-number-0',
    droneSerialNumber: 'test-drone-serial-0',
    lastViolation: 1000,
    closestDistance: 100,
  },
  {
    pilotId: '1',
    firstName: 'test-first-name-1',
    lastName: 'test-last-name-1',
    email: 'test-email-1',
    phoneNumber: 'test-phone-number-1',
    droneSerialNumber: 'test-drone-serial-1',
    lastViolation: 3000,
    closestDistance: 400,
  },
  {
    pilotId: '2',
    firstName: 'test-first-name-2',
    lastName: 'test-last-name-2',
    email: 'test-email-2',
    phoneNumber: 'test-phone-number-2',
    droneSerialNumber: 'test-drone-serial-2',
    lastViolation: 6000,
    closestDistance: 3000,
  },
];

describe('PilotList', () => {
  it('should render the title', () => {
    render(<PilotList pilots={mockPilots} />);
    expect(screen.getByText(/Violating pilots/i)).toBeVisible();
  });

  it('should render info about the pilots in the correct order', () => {
    render(<PilotList pilots={mockPilots} />);
    const infoHeaders = screen.getAllByTestId(/pilot-info-header/i);
    expect(
      within(infoHeaders[0]).getByText(/^test-first-name-0/i)
    ).toBeVisible();
    expect(
      within(infoHeaders[1]).getByText(/^test-first-name-1/i)
    ).toBeVisible();
    expect(
      within(infoHeaders[2]).getByText(/^test-first-name-2/i)
    ).toBeVisible();
  });

  it('should render a placeholder if no pilots are given', () => {
    render(<PilotList pilots={[]} />);
    expect(
      screen.getByText(/No violations within the last 10 minutes./i)
    ).toBeVisible();
  });
});
