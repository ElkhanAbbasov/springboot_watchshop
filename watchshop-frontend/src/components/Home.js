import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2>Welcome</h2>
            <nav>
                <ul>
                    <li><Link to="/user">Go to User Panel</Link></li>
                    <li><Link to="/admin">Go to Admin Panel</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
