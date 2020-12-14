import Home from '../containers/pages/Home/Home';
import Login from '../containers/pages/Login/Login';
import Register from '../containers/pages/Register/Register';

const components = {
    login: {
        path: "/",
        page: Login
    },
    register: {
        path: "/register",
        page: Register
    },
    home: {
        path: "/home",
        page: Home
    }
};

const roles = {
    GUEST: [
        components.login,
        components.register
    ],
    USER: [
        components.login,
        components.register
    ]
};

export default roles;