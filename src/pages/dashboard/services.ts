import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Product } from "./types";

export async function getApiRecentsProducts(): Promise<
  AxiosResponse<Product[], any>
> {
  return await api.get("/products/recents");
}

export async function getApiRecommendedsProducts(): Promise<
  AxiosResponse<Product[], any>
> {
  return await api.get("/products/recommended");
}
