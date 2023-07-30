import api from "../../services/api";

export async function getApiMyProducts(token: string) {
  return await api.get("/my-products", {
    headers: {
      Authorization: token,
    },
  });
}
