import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import UserService from "../services/UserService";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await UserService.list();
      setUsers(data.data || []);
    } catch (err) {
      setError(err.message || "Error al obtener usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    navigate("/users/new");
  }

  const handleView = (user) => {
    navigate(`/users/${user.id}`, {state: {user}});
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    if(!confirm) return;

    try {
      const response = await UserService.delete(id);
      setSuccess(response.data.message || "Usuario eliminado correctamente");
      await fetchUsers();
    } catch (error) {
      setError(error.response?.data?.message || "Error al eliminar usuario");
    }
  } 

  return (
    <div>
      <h1>Usuarios</h1>
      <button onClick={handleAddUser} style={{ marginBottom: "16px" }}>
        Agregar usuario
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{color: "green"}}>{success}</p>}
      
      {users.length === 0 ? (
        <li>No hay usuarios para mostrar.</li>
      ) : (<table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Type</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>
                <button onClick={() => handleView(user)}>View</button>{" "}
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)
      }
    </div>
  );
}

export default Users;
