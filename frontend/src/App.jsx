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
      await axios.post(API_URL, form);4
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
    <div className="mx-auto max-w-2xl flex flex-col space-y-4">
      <h1 >Student List</h1>

      {/* Student List */}
      <div>
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student._id}>
              <p>Name: {student.name}</p>
              <p>Branch: {student.branch}</p>
              <p>Added: {new Date(student.timeAdded).toLocaleString()}</p>
              <button onClick={() => handleDelete(student._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No students yet!</p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
