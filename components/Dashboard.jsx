import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollectionManager from './CollectionManager';
import WalletManager from './WalletManager';
import TaskManager from './TaskManager';
import NftManager from './NftManager';

const Dashboard = () => {
    const [collections, setCollections] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const [collRes, wallRes, nftRes, taskRes] = await Promise.all([
                axios.get('/api/collections/'),
                axios.get('/api/wallets/'),
                axios.get('/api/nfts/'),
                axios.get('/api/tasks/')
            ]);
            setCollections(collRes.data);
            setWallets(wallRes.data);
            setNfts(nftRes.data);
            setTasks(taskRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-400 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <CollectionManager collections={collections} setCollections={setCollections} fetchResources={fetchResources} />
            <WalletManager wallets={wallets} setWallets={setWallets} fetchResources={fetchResources} />
            <TaskManager tasks={tasks} setTasks={setTasks} collections={collections} wallets={wallets} fetchResources={fetchResources} />
            <NftManager nfts={nfts} setNfts={setNfts} fetchResources={fetchResources} />
        </div>
    );
};

export default Dashboard;
