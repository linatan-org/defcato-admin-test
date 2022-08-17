import React from 'react';
import logo from './logo.svg';
import './App.css';
import appRoutes from './navigation';

function App() {
  return (
    <div className="App">
        {appRoutes}
    </div>
  );
}

export default App;
