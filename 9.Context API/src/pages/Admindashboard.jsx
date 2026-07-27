import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {

    const { role } = useAuth();

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <p>
                Welcome Admin 👋
            </p>

            <p>
                Your role: {role}
            </p>

            <div>
                <h2>Admin Features</h2>

                <ul>
                    <li>Manage Users</li>
                    <li>View Analytics</li>
                    <li>Manage System Settings</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;