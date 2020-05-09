import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './Components/Home/HomeComponent';

export class MainRouter extends React.Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path="/">
                        <HomeComponent />
                    </Route>
                </Switch>
            </Router>
        );
    }
}