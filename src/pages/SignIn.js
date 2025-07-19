import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login({ email, password });

      if (!response.token) {
        throw new Error("Credenciales inválidas");
      }

      navigate("/users");
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    }
  };
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
    <h2>Iniciar sesión</h2>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <br />
      <button type="submit">Entrar</button>
    </form>
  </div>
  );
}

export default Login;
