import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from "./pages/Navbar";
import { AuthProvider } from './context/AuthContext';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Navbar />
          <Outlet />
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
