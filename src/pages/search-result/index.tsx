import { useParams } from "react-router-dom";
import CardProduct from "../../components/card-product";
import UserTemplate from "../../templates/user-template";
import { getApiProductsbyName } from "./services";
import { useEffect, useState } from "react";
import { Product } from "../home/types";
import ListLoading from "../../components/list-loading";

export default function SearchProducts() {
  const params = useParams();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const nameProduct = params?.product;

  async function getProductsByName() {
    setIsLoadingProducts(true);
    try {
      const response = await getApiProductsbyName(nameProduct ?? "");
      setAllProducts(response.data);
    } catch (error) {
      alert("Erro ao buscar produtos por nome");
    }
    setIsLoadingProducts(false);
  }

  useEffect(() => {
    getProductsByName();
  }, []);

  return (
    <UserTemplate>
      <h1>Resultado da busca</h1>
      {isLoadingProducts && <ListLoading />}
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

      <p>Total: {allProducts.length} itens</p>
    </UserTemplate>
  );
}
