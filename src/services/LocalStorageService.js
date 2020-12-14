const setToken = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token);
};

const getToken = () => {
    return localStorage.getItem("ACCESS_TOKEN");
};

const removeToken = () => {
    return localStorage.clear();
};

const getRole = () => {
    if (getToken()) {
        return "USER";
    }
    return "GUEST";
};

const sumFunction = {
    setToken,
    getToken,
    removeToken,
    getRole
}

export default sumFunction;