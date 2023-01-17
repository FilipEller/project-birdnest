import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render the title', () => {
    render(<App />);
    expect(screen.getByText(/Birdnest/i)).toBeInTheDocument();
  });

  it('should render the list of pilots', () => {
    render(<App />);
    expect(screen.getByTestId('pilot-list')).toBeInTheDocument();
  });
});
