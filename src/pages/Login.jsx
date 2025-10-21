import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser } from "../store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";


const loginSchema = z.object ({
  email: z.string() .min (1, "email is required"),
  password: z.string().min (6, "password must be at least 6 characters")
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector ((state) => state.auth);

  const {
    register,
    handleSubmit, 
    formState: { errors }, 
    } = useForm({
      resolver: zodResolver(loginSchema),
    });
  console.log(errors);

const onSubmit = async (data) => {
  try {
    await dispatch (loginUser(data)).unwrap();
    navigate("/notes");
  } catch (error) {
    console.error ("Failed to Login:", error);
  }
};

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-yellow-600 hover:text-yellow-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
