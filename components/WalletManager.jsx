import React, { useState } from 'react';
import axios from 'axios';

const WalletManager = ({ wallets, setWallets, fetchResources }) => {
    const [newWallet, setNewWallet] = useState({ name: '', publicKey: '', secretKey: '' });

    const handleWalletSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/wallets/', newWallet);
            setWallets([...wallets, response.data]);
            setNewWallet({ name: '', publicKey: '', secretKey: '' });
        } catch (error) {
            console.error('Error adding wallet:', error);
        }
    };

    const deleteWallet = async (id) => {
        try {
            await axios.delete(`/api/wallets/${id}`);
            fetchResources();
        } catch (error) {
            console.error('Error deleting wallet:', error);
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Wallets</h2>
            <ul className="mb-4">
                {wallets.map(wallet => (
                    <li key={wallet.id} className="flex justify-between items-center border p-2 mb-2">
                        {wallet.name}
                        <button onClick={() => deleteWallet(wallet.id)} className="bg-red-500 text-white p-1 ml-2 cursor-pointer">Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleWalletSubmit} className="space-y-2">
                <input type="text" placeholder="Name" value={newWallet.name} onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })} className="border p-2 w-full" />
                <input type="text" placeholder="Public Key" value={newWallet.publicKey} onChange={(e) => setNewWallet({ ...newWallet, publicKey: e.target.value })} className="border p-2 w-full" />
                <input type="text" placeholder="Secret Key" value={newWallet.secretKey} onChange={(e) => setNewWallet({ ...newWallet, secretKey: e.target.value })} className="border p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Wallet</button>
            </form>
        </div>
    );
};

export default WalletManager;
