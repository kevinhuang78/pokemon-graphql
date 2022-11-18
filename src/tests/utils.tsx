import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

type RenderScreenParams = {
  screen: ReactElement;
  graphQLMocks?: ReadonlyArray<MockedResponse>;
  history?: MemoryHistory;
};

export const renderScreen = ({
  screen,
  graphQLMocks,
  history = createMemoryHistory(),
}: RenderScreenParams) => {
  history.replace = jest.fn();
  history.push = jest.fn();

  return render(
    <Router location={history.location} navigator={history}>
      <MockedProvider mocks={graphQLMocks}>
        {screen}
      </MockedProvider>
    </Router>
  );
};

export const historyPushedRoute = (history: MemoryHistory, pathname: string) => {
  expect(history.push).toHaveBeenCalledWith(
    {
      hash: '',
      pathname,
      search: ''
    },
    undefined,
    {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
    });
}
