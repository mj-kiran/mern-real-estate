import React, { useState } from "react";
import { Link ,useNavigate} from 'react-router-dom'
import Oauth from "../components/Oauth";
export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null)
      setTimeout(() => {
        navigate("/sign-in");
      },2000)
      
    
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1> */}

      <form
        className="bg-white p-6 rounded shadow-md w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="text-center">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded uppercase hover:opacity-90"
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
        </div>
        <div className="text-center mt-2">
          <Oauth/>
        </div>
        <div className="flex gap-2 mt-4">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
} 
 