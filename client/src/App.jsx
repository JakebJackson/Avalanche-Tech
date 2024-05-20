import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { OrderProvider } from './utils/GlobalState';
import { useLocation } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const currentPage = useLocation().pathname;

  return (
    <ApolloProvider client={client}>
      <OrderProvider>
        <Nav />
        <Outlet />
      </OrderProvider>
    </ApolloProvider>
  );
}

export default App
