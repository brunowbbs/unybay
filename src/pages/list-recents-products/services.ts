import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Product } from "./types";

export async function getApiAllProductsRecents(): Promise<
  AxiosResponse<Product[], any>
> {
  return await api.get("/products/recents-all");
}
