import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-65704-default-rtdb.firebaseio.com/",
});

export default instance;
