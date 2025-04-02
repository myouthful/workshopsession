import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import loginlockicon from "../assets/loginlockicon.png";

const SignInComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://epaydatabase.onrender.com/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            clientid: "67c2b220f06d9759783b3ce3",
            nonce: "67c2b220f06d9759783b3ce3",
            signature: "67c2b220f06d9759783b3ce3",
          },
        }
      );

      if (response.data.status === "success") {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            account_number: response.data.data.account_number,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
          })
        );

        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputBaseClass =
    " w-[250px]  min-[650px]:w-[400px] border-b border-black pb-2 text-gray-600 focus:outline-none";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className=" ">
        <div className="text-center mb-8 min-[650px]:mb-12">
          <h1 className="text-xl font-opensans min-[650px]:text-2xl font-semibold text-gray-800 mb-2 min-[650px]:mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 font-opensans text-sm min-[650px]:text-base">
            Login, your funds are safely secured
          </p>
        </div>
        <div>  
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 min-[650px]:space-y-8">
          <div>
            <label className="text-sm text-gray-500 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputBaseClass}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputBaseClass}
              required
            />
          </div>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <div className="w-[250px] min-[650px]:w-[400px] mx-auto">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-button-blue text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm min-[650px]:text-base"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm min-[650px]:text-base">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-button-blue hover:text-blue-600 transition-colors font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInComponent;
