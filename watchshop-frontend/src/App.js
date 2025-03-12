import React from "react";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";
import "./styles.css";


function App() {
    return (
        <div>
            <h1>Watchshop Dashboard</h1>
            <UserPanel />
             <AdminPanel />
        </div>
    );
}

export default App;
