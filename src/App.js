import './App.css';
import { useState } from 'react';
import PrivateRoutes from './containers/PrivateRoutes/PrivateRoutes';
import LocalStorageService from './services/LocalStorageService';
import UserContext from './context/UserContext';
import Navbar from './components/Navbar/Navbar';
import jwtDecode from 'jwt-decode';

function App() {

  let initialUser = null;
  const token = LocalStorageService.getToken();
  if (token) {
    initialUser = jwtDecode(token);
  }

  const [role, setRole] = useState(LocalStorageService.getRole());
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [bag, setBag] = useState('');

  console.log(user);

  const showModal = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ role, setRole, setShowLoginForm, showLoginForm, showModal, user, setUser, bag, setBag }}>
        <Navbar showModal={showModal} />
        <PrivateRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
