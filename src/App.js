import Routee from './routes';
import './App.css';
import Layout from './Layout/Layout';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CardProvider from './Providers/CardProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <CardProvider>
        <Layout>
          <Routee />
        </Layout>
        </CardProvider>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
