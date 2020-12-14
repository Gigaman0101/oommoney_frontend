import './App.css';
import { useState } from 'react';
import PrivateRoutes from './containers/PrivateRoutes/PrivateRoutes';
import LocalStorageService from './services/LocalStorageService';
import UserContext from './context/UserContext';

function App() {
  const [role, setRole] = useState(LocalStorageService.getRole());

  return (
    <div className="App">
      <UserContext.Provider value={{ role, setRole }}>
        <PrivateRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
