import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";


export function userLoader({ params }) {
  const user = {
    id: params.userId,
    name: "teste",
    email: "teste@gmail.com",
  };

  return { user };
}

function EditUser() {
  // const { user } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    type: user?.type || "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isEditMode = !!user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userId = isEditMode ? user.id : 0;
      
      const response = await UserService.createUpdateUser(formData, userId);

      if (response.status === 200) {
        setSuccess(isEditMode ? "Usuario actualizado." : "Usuario creado.");
        setTimeout(() => navigate("/users"), 1000);
      } else {
        throw new Error("Error al guardar");
      }
    } catch (err) {
      setError(err.message || "Error inesperado");
    }
  };



  return (
    <div>
      <h2>{isEditMode ? "Editar Usuario" : "Crear Usuario"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <br />

        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={isEditMode ? "••••••" : "Ingresa una contraseña"}
          required={!isEditMode} // requerido solo al crear
        />
        <br />

        <button type="submit">{isEditMode ? "Guardar Cambios" : "Crear Usuario"}</button>
      </form>
    </div>
  );
}

export default EditUser;
