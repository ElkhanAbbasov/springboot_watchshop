import React, { useEffect, useState } from "react";
import axios from "axios";

const WatchList = () => {
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/watches")
            .then(response => {
                console.log("API Response:", response.data);  // Debugging line
                setWatches(response.data);
            })
            .catch(error => console.error("Error fetching watches:", error));
    }, []);

    return (
        <div>
            <h2>Available Watches</h2>
            <ul>
                {watches.length > 0 ? (
                    watches.map(watch => (
                        <li key={watch.id}>
                            <strong>{watch.name}</strong> - ${watch.price}
                            <br />
                            <img
                                src={`http://localhost:8080/api/images/${watch.imagePath.split('/').pop()}`}
                                alt={watch.name}
                                width="100"
                            />
                        </li>
                    ))
                ) : (
                    <p>No watches available.</p>
                )}
            </ul>
        </div>
    );
};

export default WatchList;

