import axios from "axios";

const BIN_ID = "687219ca5367607742c08e11"; // Replace with your JSON Bin ID
const API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB."; // Replace with your JSON Bin API Key
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const headers = {
  "X-Master-Key": API_KEY,
  "Content-Type": "application/json",
};

// Fetch all users
export const getUsers = async () => {
  const response = await axios.get(BASE_URL, { headers });
  return response.data.record.users || []; // Extract only users array
};

// Add a new user
export const addUser = async (user: any) => {
  const users = await getUsers();
  users.push(user);
  
  await axios.put(BASE_URL, { users }, { headers }); // Ensure correct JSON structure
};

// Update a user (Admin)
export const updateUser = async (index: number, updatedUser: any) => {
  const users = await getUsers();
  users[index] = updatedUser;

  await axios.put(BASE_URL, { users }, { headers }); // Send entire users object
};

// Delete a user
export const deleteUser = async (index: number) => {
  const users = await getUsers();
  users.splice(index, 1); // Remove user at index

  await axios.put(BASE_URL, { users }, { headers }); // Send updated users object
};
