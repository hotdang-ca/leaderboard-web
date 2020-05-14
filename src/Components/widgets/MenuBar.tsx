import * as React from 'react';
import { Link } from 'react-router-dom';

export const MenuBar = (): JSX.Element => {
    const userId = localStorage.getItem('com.reginavillains.leaderboards.userId');
    const admin = localStorage.getItem('com.reginavillains.leaderboards.admin');

    const logout = () => {
        localStorage.removeItem('com.reginavillains.leaderboards.userId');
        localStorage.removeItem('com.reginavillains.leaderboards.admin');

        window.location.href = '/';
    }

    return (
    <div className="menu-bar">
        <Link to="/">Home</Link>
        <Link to="/leaderboards">Leaderboards</Link>
        { userId ? <Link to="/profile">Profile</Link>  : <Link to="/register">Register</Link> }
        { admin === 'true' && <strong><Link to="/admin">Admin</Link></strong> }
        { userId ? <a href="" onClick={logout}>Logout</a>: <Link to="/login">Login</Link> }
    </div>    
    )
}