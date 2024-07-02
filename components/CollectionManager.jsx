import React, { useState } from 'react';
import axios from 'axios';

const CollectionManager = ({ collections, setCollections, fetchResources }) => {
    const [newCollection, setNewCollection] = useState({ name: '', address: '' });

    const handleCollectionSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/collections/', newCollection);
            setCollections([...collections, response.data]);
            setNewCollection({ name: '', address: '' });
        } catch (error) {
            console.error('Error adding collection:', error);
        }
    };

    const deleteResource = async (id) => {
        try {
            await axios.delete(`/api/collections/${id}`);
            fetchResources();
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Collections</h2>
            <ul className="mb-4">
                {collections.map(collection => (
                    <li key={collection.id} className="flex justify-between items-center border p-2 mb-2">
                        {collection.name} ({collection.address})
                        <button onClick={() => deleteResource(collection.id)} className="bg-red-500 text-white p-1 cursor-pointer">Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCollectionSubmit} className="space-y-2">
                <input type="text" placeholder="Name" value={newCollection.name} onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })} className="border p-2 w-full" />
                <input type="text" placeholder="Address" value={newCollection.address} onChange={(e) => setNewCollection({ ...newCollection, address: e.target.value })} className="border p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Collection</button>
            </form>
        </div>
    );
};

export default CollectionManager;
