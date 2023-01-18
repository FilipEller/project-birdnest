import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PilotInfo from './PilotInfo';

const mockPilot = {
  pilotId: '0',
  firstName: 'test-first-name-0',
  lastName: 'test-last-name-0',
  email: 'test-email-0',
  phoneNumber: 'test-phone-number-0',
  droneSerialNumber: 'test-drone-serial-0',
  lastViolation: 10000,
  closestDistance: 100,
};
describe('Pilotinfo', () => {
  beforeEach(() => {
    render(<PilotInfo pilot={mockPilot} />);
  });

  it("should render the pilot's full name", () => {
    expect(screen.getByTestId('pilot-info-header')).toBeVisible();
    expect(
      screen.getByText(/test-first-name-0 test-last-name-0/i)
    ).toBeVisible();
  });

  it('should not show details initially', () => {
    expect(screen.queryByTestId('pilot-info-details')).not.toBeVisible();
  });

  it('should show details when clicked', () => {
    expect(screen.getByTestId('pilot-info-header')).toBeVisible();
    userEvent.click(screen.getByTestId('pilot-info-header'));
    const detailsContainer = screen.getByTestId('pilot-info-details');

    expect(detailsContainer).toBeVisible();
    expect(within(detailsContainer).getByText(/test-email-0/i)).toBeVisible();
    expect(
      within(detailsContainer).getByText(/test-phone-number-0/i)
    ).toBeVisible();
    expect(within(detailsContainer).getByText(/100 m/i)).toBeVisible();
    expect(
      within(detailsContainer).getByText(/01\/01\/1970, 02:00:10/i)
    ).toBeVisible();
  });
});
