import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const currentUserId = localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            const filteredUsers = response.data.user.filter(user => user._id !== currentUserId);
            setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [filter]);

    return (
        <div className="flex flex-col mt-3">
            <div className="font-bold text-lg mb-2 pl-3">Users</div>
            <div className="flex justify-around mb-3">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="h-[90%] border-2 rounded w-full mr-3 ml-3 p-2 shadow"
                    onChange={e => setTimeout(() => {
                        setFilter(e.target.value); 
                    }, 300)}
                />
            </div>
            <div className="flex flex-col mx-6">
                {users.length === 0 ? (
                    <div>No users found.</div>
                ) : (
                    users.map((user) => (
                        <div
                            key={user._id}
                            className="flex justify-between items-center mb-3"
                        >
                            <div className="flex items-center">
                                <div className="flex border-2 bg-slate-200 mr-2 rounded-full w-12 h-12 items-center justify-center">
                                    {user.firstName[0]}
                                </div>
                                <div className="font-semibold">{user.firstName} {user.lastName}</div>
                            </div>
                            <button
                                type="button"
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none mt-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                onClick={() => {
                                    navigate(`/send?id=${user._id}&name=${user.firstName}`)
                                }}
                            >
                                Send Money
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
