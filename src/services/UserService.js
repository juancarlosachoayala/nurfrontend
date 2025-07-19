import axios from "axios";

const API = "http://localhost:3001";

class UserService {
  
  constructor(){
    this.token = localStorage.getItem("token");
  }
  async list() {
    const token = localStorage.getItem("token");
    const users = await axios.get(`${API}/usersview`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return users;
  }

  async createUpdateUser(data, userId = 0) {
    const token = localStorage.getItem("token");
    let endpointUrl = `${API}/create-update-user`;
    if(userId !== 0){
      endpointUrl = `${API}/create-update-user?user_id=${userId}`;
    }
    const response = await axios.post(endpointUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  }

  async delete(userId) {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API}/delete-user?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  }

  async get(id) {
    throw new Error("Not implemented");
  }
  async create(data) {
    throw new Error("Not implemented");
  }
  async update(id, data) {
    throw new Error("Not implemented");
  }
}

const userService = new UserService();
export default userService;
