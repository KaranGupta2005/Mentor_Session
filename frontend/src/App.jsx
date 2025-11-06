import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", branch: "" });

  const API_URL = "http://localhost:5000/api/students";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({ name: "", branch: "" });
      fetchStudents();
    } catch (error) {
      console.log("Error adding student:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-400 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-black bg-purple-300 px-6 py-3 mx-auto  shadow-lg mb-10">
        Student Management
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-green-700 p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-s font-semibold text-gray-700">Add New Student</h2>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          type="submit"
          className="w-full bg-green-300 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Student
        </button>
      </form>

      {/* Student List Section */}
      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Student List
        </h2>

        {students.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {students.map((student) => (
              <div
                key={student._id}
                className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {student.name}
                  </p>
                  <p className="text-gray-600 text-sm">{student.branch}</p>
                  <p className="text-gray-400 text-xs">
                    Added: {new Date(student.timeAdded).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No students yet!</p>
        )}
      </div>
    </div>
  );
}
