import api from "../../services/api";
import { RegisterForm } from "./types";

export async function registerUser(values: RegisterForm) {
  return await api.post("/register", {
    name: values.name,
    email: values.email,
    phone: values.phone,
    city: values.city,
    state: values.state,
    password: values.password,
  });
}
