import { Carousel } from "react-responsive-carousel";
import UserTemplate from "../../templates/user-template";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApiDetailsProducts } from "./services";
import { Product } from "./types";
import { formatPrice } from "../../utils/format-price";

export default function Details() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState<Product>({} as Product);

  async function getDetailsProduct() {
    try {
      const response = await getApiDetailsProducts(id ?? "");
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Erro ao buscar dados do produto");
    }
  }

  useEffect(() => {
    getDetailsProduct();
  }, []);

  return (
    <UserTemplate>
      <p className="text-[30px]">{product.name}</p>
      <div className="flex mt-10 gap-10 justify-center">
        <div className="w-[40%]">
          <Carousel showThumbs={false}>
            <div>
              <img src={product.url1} />
            </div>
            <div>
              <img src={product.url2} />
            </div>
          </Carousel>
        </div>
        <div>
          <div className="shadow-sm bg-white px-10 py-2">
            <p>Informações do vendedor</p>
            <p>{product.user?.name || "-"}</p>
            <p>
              {product.user?.city} {product.user?.state}
            </p>
            <p>Email: {product.user?.email}</p>
            <p>{product.user?.phone}</p>
          </div>
          <div className="shadow-sm mt-4 bg-white px-10 py-2">
            <p className="text-[30px]">{formatPrice(product.price)}</p>
          </div>
        </div>
      </div>

      <h3 className="mt-10 text-[20px]">Detalhes do produto</h3>

      <div
        className="mt-3"
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></div>
    </UserTemplate>
  );
}
