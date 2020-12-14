import React, { useContext, useState } from 'react';
import RolesList from '../../config/roles';
import { Switch, Route } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import LocalStorageService from '../../services/LocalStorageService';
import jwtDecode from 'jwt-decode';
import NotFound from '../pages/NotFound/NotFound';

function PrivateRoutes(props) {
    const { role, setRole } = useContext(UserContext);

    const roleStatus = role || "GUEST";
    const token = LocalStorageService.getToken();

    let initialUser;
    if (token) {
        initialUser = jwtDecode(token);
    };

    const [user, setUser] = useState(initialUser);
    return (
        <>
            <Switch>
                {RolesList[role].map(({ path, page: PageComponent }, idx) => <Route exact path={path} key={idx}>
                    <PageComponent key={idx} setRole={setRole} role={roleStatus} setUser={setUser} user={user} />
                </Route>)}
                <Route path="*" component={NotFound} />
            </Switch>
        </>
    );
}

export default PrivateRoutes
