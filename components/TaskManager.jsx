import React, { useState } from 'react';
import axios from 'axios';

const TaskManager = ({ tasks, setTasks, collections, wallets, fetchResources }) => {
    const [newTask, setNewTask] = useState({
        collection: '',
        wallet: '',
        maxPrice: ''
    });

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/tasks/', {
                collection: newTask.collection,
                wallet: newTask.wallet,
                max_price: newTask.maxPrice
            });
            setTasks([...tasks, { ...newTask, id: response.data.id }]);
            setNewTask({ collection: '', wallet: '', maxPrice: '' });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleTaskAction = async (taskId, action) => {
        try {
            let response;
            if (action === 'start') {
                response = await axios.post(`/api/start-task/`, { task_id: taskId });
            } else if (action === 'stop') {
                response = await axios.post(`/api/revoke-task/${taskId}/`);
            } else if (action === 'status') {
                response = await axios.get(`/api/task-status/${taskId}/`);
                return;  // This might require additional handling
            }
            fetchResources();
        } catch (error) {
            console.error(`Error performing ${action} on task ${taskId}:`, error);
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Purchase Tasks</h2>
            <ul className="mb-4">
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center border p-2 mb-2">
                        {task.collection.name} - {task.wallet.name} - Max Price: {task.maxPrice}
                        <button onClick={() => handleTaskAction(task.id, 'status')} className="bg-blue-500 text-white p-1 ml-2 cursor-pointer">Status</button>
                        <button onClick={() => handleTaskAction(task.id, 'stop')} className="bg-red-500 text-white p-1 ml-2 cursor-pointer">Stop</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleTaskSubmit} className="space-y-2">
                <select value={newTask.collection} onChange={(e) => setNewTask({ ...newTask, collection: e.target.value })} className="border p-2 w-full">
                    <option value="">Select Collection</option>
                    {collections.map(collection => (
                        <option key={collection.id} value={collection.id}>{collection.name}</option>
                    ))}
                </select>
                <select value={newTask.wallet} onChange={(e) => setNewTask({ ...newTask, wallet: e.target.value })} className="border p-2 w-full">
                    <option value="">Select Wallet</option>
                    {wallets.map(wallet => (
                        <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                    ))}
                </select>
                <input type="text" placeholder="Max Price" value={newTask.maxPrice} onChange={(e) => setNewTask({ ...newTask, maxPrice: e.target.value })} className="border p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
            </form>
        </div>
    );
};

export default TaskManager;
