import * as React from 'react';
import { Link } from 'react-router-dom';

export const MenuBar = (): JSX.Element => {
    const userId = localStorage.getItem('userId');
    
    const logout = () => {
        localStorage.removeItem('userId');
        window.location.href = '/';
    }

    return (
    <div className="menu-bar">
        <Link to="/">Home</Link>
        <Link to="/leaderboards">Leaderboards</Link>
        { userId ? null  : <Link to="/register">Register</Link> }
        { userId ? <a href="" onClick={logout}>Logout</a>: <Link to="/login">Login</Link> }
    </div>    
    )
}