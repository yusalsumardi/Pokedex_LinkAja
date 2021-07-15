import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Pokemon } from '../../pages';



const RouterContent = () => {
    return (
        <Switch>
            <Route
                exact path="/" render={(props) => <Home {...props} />}
            />
            <Route
                exact
                path="/:pokemonId"
                render={(props) => <Pokemon {...props} />}
            />
        </Switch>
    )
}
export default RouterContent;