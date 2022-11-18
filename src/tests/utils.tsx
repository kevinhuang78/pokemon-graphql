import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

type RenderScreenParams = {
  screen: ReactElement;
  graphQLMocks?: ReadonlyArray<MockedResponse>;
};

export const renderScreen = ({
  screen,
  graphQLMocks,
}: RenderScreenParams) => render(
  <MemoryRouter>
    <MockedProvider mocks={graphQLMocks}>
      {screen}
    </MockedProvider>
  </MemoryRouter>
);
