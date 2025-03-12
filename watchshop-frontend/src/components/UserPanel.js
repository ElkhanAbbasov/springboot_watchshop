import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPanel = () => {
    const [watches, setWatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchWatches();
    }, []);

    const fetchWatches = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/watches");
            setWatches(response.data);
        } catch (error) {
            console.error("Error fetching watches:", error);
        }
    };

    const addToCart = (watch) => {
        setCart([...cart, watch]);
    };

    return (
        <div>
            <h2>Available Watches</h2>
            <input
                type="text"
                placeholder="Search watches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {watches.filter(watch => watch.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((watch) => (
                        <li key={watch.id}>
                            <strong>{watch.name}</strong> - ${watch.price}
                            <br />
                            <img
                                src={
                                    watch.imagePath
                                        ? `http://localhost:8080${watch.imagePath}`
                                        : "http://localhost:8080/api/watches/images/default.png"
                                }
                                alt={watch.name}
                                width="100"
                            />
                            <br />
                            <button onClick={() => addToCart(watch)}>Add to Cart</button>
                        </li>
                    ))}
            </ul>

            <h3>Cart ({cart.length} items)</h3>
            <ul>
                {cart.map((watch, index) => (
                    <li key={index}>{watch.name} - ${watch.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserPanel;
