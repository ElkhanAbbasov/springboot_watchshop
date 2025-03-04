import React from "react";
import AdminPanel from "./components/AdminPanel";
import WatchList from "./components/WatchList"; // If you want to keep it

function App() {
    return (
        <div>
            <h1>Watchshop Dashboard</h1>
            <AdminPanel />
            <WatchList />
        </div>
    );
}

export default App;
