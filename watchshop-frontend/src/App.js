import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";
import Home from "./components/Home"; // Optional: A home page
import "./styles.css";

function App() {
    return (
        <Router>
            <div>
                <h1>Watchshop Dashboard</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/user" element={<UserPanel />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
