import Home from '../containers/pages/Home/Home';
import Login from '../containers/pages/Login/Login';
import Money from '../containers/pages/Money/Money';
import Register from '../containers/pages/Register/Register';

const components = {
    login: {
        path: "/login",
        page: Login
    },
    register: {
        path: "/register",
        page: Register
    },
    home: {
        path: "/",
        page: Home
    },
    money: {
        path: "/money",
        page: Money
    }
};

const roles = {
    GUEST: [
        components.login,
        components.register,
        components.home
    ],
    USER: [
        components.login,
        components.register,
        components.home,
        components.money
    ]
};

export default roles;