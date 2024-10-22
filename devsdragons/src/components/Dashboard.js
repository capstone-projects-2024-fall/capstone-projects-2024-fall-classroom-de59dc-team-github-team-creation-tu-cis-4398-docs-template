import React from 'react';

const Dashboard = ({ onLogout }) => {
    const handleLogoutClick = () => {
        onLogout(); // Call the onLogout function
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
};

export default Dashboard;