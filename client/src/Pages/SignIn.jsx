import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import Oauth from "../components/Oauth";
export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {loading,error}=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch=useDispatch()
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
      dispatch(signInStart())
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1> */}

      <form
        className="bg-white p-6 rounded shadow-md w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl text-center font-bold mb-4">Sign In</h1>

        <div className="mb-4 mt-6">
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
        <div className="text-center ">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded uppercase hover:opacity-90"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>

        <div className="text-center mt-2">
         
          <Oauth />
        </div>

        <div className="flex gap-2 mt-4">
          <p className="text-sm">Do Not Have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-500">SignUp</span>
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
