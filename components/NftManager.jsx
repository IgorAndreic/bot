import React from 'react';
import axios from 'axios';

const NftManager = ({ nfts, setNfts, fetchResources }) => {
    const deleteNft = async (id) => {
        try {
            await axios.delete(`/api/nfts/${id}`);
            fetchResources();
        } catch (error) {
            console.error('Error deleting NFT:', error);
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">NFTs</h2>
            <ul className="mb-4">
                {nfts.map(nft => (
                    <li key={nft.id} className="flex justify-between items-center border p-2 mb-2">
                        {nft.name} - {nft.price} - {nft.url} - {nft.is_purchased ? 'Purchased' : 'Not Purchased'}
                        <button onClick={() => deleteNft(nft.id)} className="bg-red-500 text-white p-1 ml-2 cursor-pointer">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NftManager;
