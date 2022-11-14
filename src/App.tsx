import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Details from './screens/Details';

const client = new ApolloClient({
  uri: 'https://graphqlpokemon.favware.tech/v7'
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:pokemonKey' element={<Details />} />
        </Routes>
      </main>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
