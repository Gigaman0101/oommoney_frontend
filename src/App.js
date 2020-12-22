import './App.css';
import { useState } from 'react';
import PrivateRoutes from './containers/PrivateRoutes/PrivateRoutes';
import LocalStorageService from './services/LocalStorageService';
import UserContext from './context/UserContext';
import Navbar from './components/Navbar/Navbar';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

function App() {

  const history = useHistory();

  // check ว่า มี
  let initialUser = null;
  const token = LocalStorageService.getToken();

  if (token) {
    console.log(jwtDecode(token));
    initialUser = jwtDecode(token);
  };


  const [role, setRole] = useState(LocalStorageService.getRole());
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [bag, setBag] = useState('');
  const [growBag, setGrowBag] = useState(false);
  const [funBag, setFunBag] = useState(false);

  if (token) {
    if (initialUser.expire < new Date().getTime()) {
      LocalStorageService.removeToken()
      setRole("GUEST");
      history.push("/");
    }
  };

  const showModal = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ role, setRole, setShowLoginForm, showLoginForm, showModal, user, setUser, bag, setBag, growBag, setGrowBag, funBag, setFunBag }}>
        <Navbar showModal={showModal} />
        <PrivateRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
