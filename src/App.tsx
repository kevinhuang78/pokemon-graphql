import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Home from './screens/Home/Home';
import Details from './screens/Details/Details';
import NotFound from './screens/NotFound/NotFound';

const client = new ApolloClient({
  uri: 'https://graphqlpokemon.favware.tech/v7',
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:pokemonKey' element={<Details />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
