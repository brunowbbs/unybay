import { useEffect, useState } from "react";
import CardProduct from "../../components/card-product";
import UserTemplate from "../../templates/user-template";
import { getApiAllProducts, getApiAllProductsOrdered } from "./services";
import { Product } from "./types";
import ListLoading from "../../components/list-loading";

export default function ListAllProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoadingRecents, setIsLoadingRecents] = useState(false);

  async function getAllRecentsProducts() {
    setIsLoadingRecents(true);
    try {
      const response = await getApiAllProducts();
      setAllProducts(response.data);
    } catch (error) {
      alert("Houve um erro ao buscar todos os produtos recentes");
    }
    setIsLoadingRecents(false);
  }

  async function getAllOrderProducts(typeOrder: "descending" | "ascending") {
    setAllProducts([]);
    setIsLoadingRecents(true);
    try {
      const response = await getApiAllProductsOrdered(typeOrder);
      setAllProducts(response.data);
    } catch (error) {
      alert("Houve um erro ao buscar todos os produtos recentes");
    }
    setIsLoadingRecents(false);
  }

  useEffect(() => {
    getAllRecentsProducts();
  }, []);

  return (
    <UserTemplate>
      <h1>Todos os produtos</h1>
      <div>
        <p>
          Ordenar por:{" "}
          <button
            className="text-primary"
            onClick={() => getAllOrderProducts("ascending")}
          >
            Menor preço
          </button>{" "}
          |{" "}
          <button
            onClick={() => getAllOrderProducts("descending")}
            className="text-primary"
          >
            Maior preço
          </button>
        </p>
      </div>
      {isLoadingRecents && <ListLoading />}
      <div className="grid grid-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        {allProducts.map((product) => (
          <CardProduct
            id={product._id}
            key={product._id}
            name={product.name}
            img={product.url1}
            manufacturer={product.manufacturer}
            price={product.price}
          />
        ))}
      </div>
    </UserTemplate>
  );
}
