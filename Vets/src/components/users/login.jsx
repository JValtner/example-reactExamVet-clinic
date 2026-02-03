import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/contextUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login({
        username: data.username.trim(),
        password: data.password,
      });
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check your username and password.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign in</h3>

      <label>
        <span>Username</span>
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
          autoComplete="username"
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          autoComplete="current-password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
