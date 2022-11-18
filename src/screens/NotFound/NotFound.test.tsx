import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import { historyPushedRoute, renderScreen } from '../../tests/utils';

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
    const history = createMemoryHistory({ initialEntries: ['/random-route'], initialIndex: 0 });
    renderScreen({
      screen: <NotFound />,
      history,
    });

    userEvent.click(screen.getByRole('link', { name: 'home page' }));

    historyPushedRoute(history, '/');
    expect(history.push).toHaveBeenCalledTimes(1);
  });
});
