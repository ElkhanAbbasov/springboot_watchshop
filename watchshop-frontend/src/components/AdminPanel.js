import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [watches, setWatches] = useState([]);
    const [newWatch, setNewWatch] = useState({ name: "", price: "", image: null });
    const [editWatch, setEditWatch] = useState(null);

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

    const handleInputChange = (e) => {
        setNewWatch({ ...newWatch, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setNewWatch({ ...newWatch, image: e.target.files[0] });
    };

    const addWatch = async () => {
        if (!newWatch.name || !newWatch.price) {
            console.error("Name and price are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", newWatch.name);
        formData.append("price", parseInt(newWatch.price, 10));
        if (newWatch.image) {
            formData.append("file", newWatch.image);
        }

        try {
            await axios.post("http://localhost:8080/api/watches/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            fetchWatches();
            setNewWatch({ name: "", price: "", image: null });
        } catch (error) {
            console.error("Error adding watch:", error);
        }
    };

    const deleteWatch = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/watches/${id}`);
            await fetchWatches();  // Ensure this line exists
        } catch (error) {
            console.error("Error deleting watch:", error);
        }
    };


    const startEdit = (watch) => {
        setEditWatch({ ...watch, price: watch.price.toString() });
    };

    const handleEditInputChange = (e) => {
        setEditWatch({ ...editWatch, [e.target.name]: e.target.value });
    };

    const handleEditFileChange = (e) => {
        setEditWatch({ ...editWatch, image: e.target.files[0] });
    };

    const updateWatch = async () => {
        if (!editWatch.name || !editWatch.price) {
            console.error("Name and price are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", editWatch.name);
        formData.append("price", parseInt(editWatch.price, 10));
        if (editWatch.image) {
            formData.append("file", editWatch.image);
        }

        try {
            await axios.put(`http://localhost:8080/api/watches/${editWatch.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            await fetchWatches();
            setEditWatch(null);
        } catch (error) {
            console.error("Error updating watch:", error);
        }
    };


    return (
        <div>
            <h2>Admin Panel - Manage Watches</h2>

            <div>
                <h3>Add New Watch</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newWatch.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newWatch.price}
                    onChange={handleInputChange}
                />
                <input type="file" onChange={handleFileChange} />
                <button onClick={addWatch}>Add Watch</button>
            </div>

            {editWatch && (
                <div>
                    <h3>Edit Watch</h3>
                    <input
                        type="text"
                        name="name"
                        value={editWatch.name}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        value={editWatch.price}
                        onChange={handleEditInputChange}
                    />
                    <input type="file" onChange={handleEditFileChange} />
                    <br />
                    <img
                        src={
                            editWatch.imagePath
                                ? `http://localhost:8080${editWatch.imagePath}`
                                : "http://localhost:8080/api/watches/images/default.png"
                        }
                        alt={editWatch.name}
                        width="100"
                    />
                    <br />
                    <button onClick={updateWatch}>Update</button>
                    <button onClick={() => setEditWatch(null)}>Cancel</button>
                </div>
            )}

            <h3>Available Watches</h3>
            <ul>
                {watches.map((watch) => (
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
                        <button onClick={() => startEdit(watch)}>Edit</button>
                        <button onClick={() => deleteWatch(watch.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
