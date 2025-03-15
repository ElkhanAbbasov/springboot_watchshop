import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPanel = () => {
    const [watches, setWatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);
    const [showDetails, setShowDetails] = useState({}); // Track details visibility

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

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    const toggleDetails = (id) => {
        setShowDetails(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle visibility for this watch
        }));
    };

    const totalPrice = cart.reduce((acc, watch) => acc + watch.price, 0); // Calculate total price

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
                        <li key={watch.id} style={{ marginBottom: "20px" }}>
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
                            {/* Details */}
                            {showDetails[watch.id] && <p>{watch.details}</p>}
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "10px" }}>
                                <button style={{ width: "100px"}} onClick={() => toggleDetails(watch.id)}>
                                    {showDetails[watch.id] ? "Hide Details" : "Show Details"}
                                </button>
                                <button style={{ width: "100px"}} onClick={() => addToCart(watch)}>Add to Cart</button>
                            </div>
                        </li>
                    ))}
            </ul>


            <h2 style={{ marginTop: "50px" }}>Cart ({cart.length} items)</h2>
            <ul>
                {cart.map((watch, index) => (
                    <li key={index}>
                        {watch.name} - ${watch.price}
                        <button style={{ display: "block", marginTop: "5px" }} onClick={() => removeFromCart(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h3>Total Price: ${totalPrice.toFixed(2)}</h3> {/* Display Total Price */}
        </div>
    );
};

export default UserPanel;
