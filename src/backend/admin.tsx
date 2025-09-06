import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "./api";
import Header from "../Home/header";

const Admin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    await deleteUser(index);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    setLoading(true);
    const index = users.findIndex((u) => u.email === editingUser.email);
    if (index !== -1) {
      const updatedUsers = [...users];
      updatedUsers[index] = editingUser;
      setUsers(updatedUsers);
      await updateUser(index, editingUser);
    }
    setEditingUser(null);
    setLoading(false);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
      {loading && <p className="text-center text-blue-500">Updating...</p>}
please don't delete all the accounts, minimum of one should be left
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border">
          
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Account Type</th>
              <th className="p-3 text-left">Balance ($)</th>
              <th className="p-3 text-left">Password</th>
              <th className="p-3 text-left">Pin</th>
              <th className="p-3 text-left">Account number</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{user.firstName} {user.lastName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.accountType}</td>
                <td className="p-3">${user.amount}</td>
                <td className="p-3">{user.password}</td>
                <td className="p-3">{user.pin}</td>
                <td className="p-3">{user.accountNumber}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            
            {/* Name */}
            <label className="block text-gray-600">Full Name:</label>
            <input
              type="text"
              value={`${editingUser.firstName} ${editingUser.lastName}`}
              onChange={(e) => {
                const [first, last] = e.target.value.split(" ");
                setEditingUser({ ...editingUser, firstName: first || "", lastName: last || "" });
              }}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />

            {/* Email */}
            <label className="block text-gray-600 mt-2">Email:</label>
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />

            {/* Account Type */}
            <label className="block text-gray-600 mt-2">Account Type:</label>
            <select
              value={editingUser.accountType}
              onChange={(e) => setEditingUser({ ...editingUser, accountType: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </select>

            {/* Balance */}
            <label className="block text-gray-600 mt-2">Balance ($):</label>
            <input
              type="number"
              value={editingUser.amount}
              onChange={(e) => setEditingUser({ ...editingUser, amount: parseFloat(e.target.value) })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            <label className="block text-gray-600 mt-2">Password:</label>
<input
  type="text"
  value={editingUser.password}
  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
/>

            <label className="block text-gray-600 mt-2">Pin:</label>
            <input
              type="text"
              value={editingUser.pin}
              onChange={(e) => setEditingUser({ ...editingUser, pin: parseFloat(e.target.value) })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          <label className="block text-gray-600 mt-2">Account Number:</label>
<input
  type="text"
  inputMode="numeric"
  value={editingUser.accountNumber}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    if (value.length <= 12) {
      setEditingUser({ ...editingUser, accountNumber: value });
    }
  }}
  maxLength={12}
  required
  className={`w-full p-2 rounded-md border focus:ring-2 
    ${editingUser.accountNumber.length === 12
      ? 'border-green-500 focus:ring-green-400'
      : 'border-red-500 focus:ring-red-400'}`}
/>

{editingUser.accountNumber.length > 0 && editingUser.accountNumber.length < 12 && (
  <p className="text-red-500 text-sm mt-1">
    Account number must be exactly 12 digits.
  </p>
)}



            {/* Save & Cancel Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div></>
  );
};

export default Admin;
