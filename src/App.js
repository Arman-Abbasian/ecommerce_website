import Routee from './routes';
import './App.css';
import Layout from './Layout/Layout';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CardProvider from './Providers/CardProvider';
import UserProvider from './Providers/UserProvider';

function App() {
  return (
    <div className="App">
      <HashRouter>
      <UserProvider>
      <CardProvider> 
          <Routee />
        </CardProvider>
      </UserProvider>
        <Toaster />
      </HashRouter>
    </div>
  );
}

export default App;
