import { screen } from '@testing-library/react';

import { renderScreen } from '../../tests/utils';

import NotFound from './NotFound';

describe('Home screen', () => {
  it('renders correctly', () => {
    renderScreen({
      screen: <NotFound />,
    });

    expect(screen.getByText('Error 404, screen not found, go back to')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'home page' })).toBeInTheDocument();
  });

  it('redirects to home screen when clicking on the link', () => {
  });
});
