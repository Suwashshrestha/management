'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaUser, FaCoffee, FaSearch, FaSignOutAlt, FaClock, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<null>(null);
    const [orders, setOrders] = useState([
        { id: 1, name: 'Latte', customer: 'John Doe', status: 'Completed' },
        { id: 2, name: 'Cappuccino', customer: 'Jane Smith', status: 'In Progress' },
        { id: 3, name: 'Espresso', customer: 'Bob Johnson', status: 'Pending' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [newOrder, setNewOrder] = useState({ name: '', customer: '' });

    const handleDeleteOrder = (id: number) => {
        const updatedOrders = orders.filter(order => order.id !== id);
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders.filter(order =>
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/');
            } else {
                setUser(user);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        const filtered = orders.filter(
            (order) =>
                order.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                order.customer.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredOrders(filtered);
    };

    const updateOrderStatus = (id: number, newStatus: string) => {
        const updatedOrders = orders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders.filter((order) =>
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    const handleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newOrder.name && newOrder.customer) {
            const newOrderData = {
                id: orders.length + 1,
                name: newOrder.name,
                customer: newOrder.customer,
                status: 'Pending',
            };
            const updatedOrders = [...orders, newOrderData];
            setOrders(updatedOrders);
            setFilteredOrders(updatedOrders);
            setNewOrder({ name: '', customer: '' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Enhanced Navigation */}
            <nav className="bg-gradient-to-r from-brown-600 to-brown-800 shadow-lg fixed w-full z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <FaCoffee className="h-8 w-8 text-white" />
                            <span className="ml-2 text-xl font-semibold text-white">Shrestha Cafe</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center bg-brown-700 rounded-full px-4 py-2">
                                <FaUser className="h-4 w-4 text-white mr-2" />
                                <span className="text-white text-sm">{user?.email}</span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200"
                            >
                                <FaSignOutAlt className="mr-2" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Pending Orders</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {orders.filter(o => o.status === 'Pending').length}
                                </p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <FaClock className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">In Progress</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {orders.filter(o => o.status === 'In Progress').length}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FaHourglassHalf className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {orders.filter(o => o.status === 'Completed').length}
                                </p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <FaCheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Order Form */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">New Order</h2>
                    <form onSubmit={handleOrderSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Drink Name</label>
                                <input
                                    type="text"
                                    value={newOrder.name}
                                    onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                                <input
                                    type="text"
                                    value={newOrder.customer}
                                    onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition-colors duration-200 font-medium"
                        >
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Enhanced Orders Table */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brown-500 focus:border-transparent w-64"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Drink
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className={`rounded-full px-3 py-1 text-sm font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}