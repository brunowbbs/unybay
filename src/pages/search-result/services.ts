import { AxiosResponse } from "axios";
import { Product } from "../home/types";
import api from "../../services/api";

export async function getApiProductsbyName(
  nameProduct: string
): Promise<AxiosResponse<Product[], any>> {
  return await api.get(`/products?name=${nameProduct}`);
}
