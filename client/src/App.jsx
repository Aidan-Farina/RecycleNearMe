import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from "./pages/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

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
          <div className="content-below-navbar"> {/* Apply the class here */}
            <Outlet />
          </div>
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
