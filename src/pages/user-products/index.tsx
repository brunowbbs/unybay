import { useNavigate } from "react-router-dom";
import CardProductAdmin from "../../components/card-product-admin";
import AdminTemplate from "../../templates/admin-template";
import { getApiMyProducts } from "./services";
import { useAuthSessionStore } from "../../hooks/use-auth-session";
import { useEffect, useState } from "react";
import { Product } from "./types";

export default function UserProducts() {
  const navigate = useNavigate();

  const { token } = useAuthSessionStore();

  const [myProducts, setMyProducts] = useState<Product[]>([]);

  async function getMyProducts() {
    try {
      const response = await getApiMyProducts(token);
      setMyProducts(response.data);
    } catch (error) {
      alert("Erro ao buscar produtos do usuario");
    }
  }

  useEffect(() => {
    getMyProducts();
  }, []);

  return (
    <AdminTemplate>
      <div className="flex justify-between items-center">
        <h1>Anúncios</h1>

        <button
          onClick={() => navigate("/form-product")}
          className="text-white rounded-md bg-secondary px-8 py-2"
        >
          Criar Anúncio
        </button>
      </div>

      <div className="grid grid-4 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
        {myProducts.map((product) => (
          <CardProductAdmin
            id={product._id}
            img={product.url1}
            name={product.name}
            price={product.price}
            manufacturer={product.manufacturer}
            setMyProducts={setMyProducts}
          />
        ))}
      </div>

      <p className="text-right">Total: {myProducts.length} itens</p>
    </AdminTemplate>
  );
}
