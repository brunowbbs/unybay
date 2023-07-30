import { useEffect, useState } from "react";
import CardProduct from "../../components/card-product";
import UserTemplate from "../../templates/user-template";
import { getApiAllProductsRecents } from "./services";
import { Product } from "./types";
import ListLoading from "../../components/list-loading";

export default function ListRecentsProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoadingRecents, setIsLoadingRecents] = useState(false);

  async function getAllRecentsProducts() {
    setIsLoadingRecents(true);
    try {
      const response = await getApiAllProductsRecents();
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
      <h1>Items Recents</h1>
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
