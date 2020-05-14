import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './Components/Home/HomeComponent';
import { LeaderBoardsComponent } from './Components/LeaderBoards/LeaderBoardsComponent';
import { RegisterComponent } from './Components/Register/RegisterComponent';
import { LoginComponent } from './Components/Login/LoginComponent';
import { ProfileComponent } from './Components/Profile/ProfileComponent';
import { AdminComponent } from './Components/Admin/AdminComponent';

export class MainRouter extends React.Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path="/leaderboards">
                        <LeaderBoardsComponent />
                    </Route>
                    
                    <Route path="/register">
                        <RegisterComponent />
                    </Route>

                    <Route path="/login">
                        <LoginComponent />
                    </Route>

                    <Route path="/profile">
                        <ProfileComponent />
                    </Route>

                    <Route path="/admin">
                        <AdminComponent />
                    </Route>
                    
                    <Route path="/">
                        <HomeComponent />
                    </Route>
                </Switch>
            </Router>
        );
    }
}