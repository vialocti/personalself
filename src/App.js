import React from 'react'
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import RoutesAsistencia from './routes/RoutesAsistencia'


function App() {
  return (
    <div className="App">
    <AuthProvider>
      <RoutesAsistencia />
      </AuthProvider>
      
    </div>
  );
}

export default App;
