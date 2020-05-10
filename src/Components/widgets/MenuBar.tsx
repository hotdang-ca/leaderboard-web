import * as React from 'react';
import { Link } from 'react-router-dom';

export const MenuBar = (): JSX.Element => (
    <div className="menu-bar">
        <Link to="/">Home</Link>
        <Link to="/leaderboards">Leaderboards</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </div>    
)