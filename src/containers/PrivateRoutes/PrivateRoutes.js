import React, { useContext } from 'react';
import RolesList from '../../config/roles';
import { Switch, Route } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import NotFound from '../pages/NotFound/NotFound';

function PrivateRoutes(props) {
    const { role, setRole } = useContext(UserContext);

    const roleStatus = role || "GUEST";

    return (
        <>
            <Switch>
                {RolesList[role].map(({ path, page: PageComponent }, idx) => <Route exact path={path} key={idx}>
                    <PageComponent key={idx} setRole={setRole} role={roleStatus} />
                </Route>)}
                <Route path="*" component={NotFound} />
            </Switch>
        </>
    );
}

export default PrivateRoutes
