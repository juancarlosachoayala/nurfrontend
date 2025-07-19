const API = "http://localhost:3001";

class AuthService {
  constructor() {
    this.isAuthenticated = false;
  }

  async login(credentials) {

    const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });

    console.log("Response from login:", response);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'error al iniciar sesión');
    }
    const data = await response.json();

    localStorage.setItem("token", data.token);
    this.isAuthenticated = true;

    return data;
  }

}

const authServiceInstance = new AuthService();
export default authServiceInstance;