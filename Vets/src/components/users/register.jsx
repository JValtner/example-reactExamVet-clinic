import React from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../../service/authService";

export default function Register({ onRegister }) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await registerUser({
      email: data.email,
      password: data.password,
      username: data.username,
      name: data.name,
      surname: data.surname,
    });

    if (onRegister) onRegister(); // optional callback for navigation or state update
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Create account</h3>

      <label>
        <span>Username</span>
        <input
          type="text"
          {...formRegister("username", { required: "Username is required" })}
          autoComplete="username"
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </label>

      <label>
        <span>Email</span>
        <input
          type="email"
          {...formRegister("email", { required: "Email is required" })}
          autoComplete="email"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          {...formRegister("password", { required: "Password is required" })}
          autoComplete="new-password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>

      <label>
        <span>Name</span>
        <input
          type="text"
          {...formRegister("name", { required: "Name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </label>

      <label>
        <span>Surname</span>
        <input
          type="text"
          {...formRegister("surname", { required: "Surname is required" })}
        />
        {errors.surname && <p className="error">{errors.surname.message}</p>}
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering…" : "Register"}
      </button>
    </form>
  );
}
