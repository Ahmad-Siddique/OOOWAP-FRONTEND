"use client"
import AdminLayout from "../../components/AdminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.firstName}</td>
              <td className="border border-gray-300 p-2">{user.lastName}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                <button className="btn btn-sm bg-black text-white rounded-sm mr-2">
                  Edit
                </button>
                <button className="btn btn-sm bg-red-600 text-white rounded-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Users;
