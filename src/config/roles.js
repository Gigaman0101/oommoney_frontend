import FunBag from '../containers/pages/FunBag/FunBag';
import GrowBag from '../containers/pages/GrowBag/GrowBag';
import Home from '../containers/pages/Home/Home';
// import Login from '../containers/pages/Login/Login';
import Money from '../containers/pages/Money/Money';
import MoneyBag from '../containers/pages/MoneyBag/MoneyBag';
import Register from '../containers/pages/Register/Register';
import Transfer from '../containers/pages/Transfer/Transfer'

const components = {
    // login: {
    //     path: "/login",
    //     page: Login
    // },
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
    },
    money_bag: {
        path: "/moneybag",
        page: MoneyBag
    },
    fun_bag: {
        path: "/funBag",
        page: FunBag
    },
    grow_bag: {
        path: "/growBag",
        page: GrowBag
    },
    transfer: {
        path: "/transfer",
        page: Transfer
    },
};

const roles = {
    GUEST: [
        // components.login,
        components.register,
        components.home
    ],
    USER: [
        // components.login,
        components.register,
        components.home,
        components.money,
        components.money_bag,
        components.fun_bag,
        components.grow_bag,
        components.transfer
    ]
};

export default roles;