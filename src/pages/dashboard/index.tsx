import CardProduct from "../../components/card-product";

import { LuGamepad2 } from "react-icons/lu";
import { GiClothes } from "react-icons/gi";
import { AiFillCar, AiOutlineGift, AiOutlineSync } from "react-icons/ai";
import { FaTools } from "react-icons/fa";
import { IoFastFoodOutline, IoSearch } from "react-icons/io5";

import { Carousel } from "react-responsive-carousel";

import caroulsel1 from "../../assets/carousel1.png";
import { Link, useNavigate } from "react-router-dom";
import { getApiRecentsProducts, getApiRecommendedsProducts } from "./services";
import { useEffect, useState } from "react";
import { Product } from "./types";
import ListLoading from "../../components/list-loading";
import AdminTemplate from "../../templates/admin-template";

const itemsCategory = [
  {
    id: 0,
    title: "Jogos",
    icon: <LuGamepad2 size={30} color="#555" />,
  },
  {
    id: 1,
    title: "Roupas",
    icon: <GiClothes size={30} color="#555" />,
  },
  {
    id: 2,
    title: "Veículos",
    icon: <AiFillCar size={30} color="#555" />,
  },
  {
    id: 3,
    title: "Ferramentas",
    icon: <FaTools size={30} color="#555" />,
  },
  {
    id: 4,
    title: "Comidas",
    icon: <IoFastFoodOutline size={30} color="#555" />,
  },
  {
    id: 5,
    title: "Presentes",
    icon: <AiOutlineGift size={30} color="#555" />,
  },
  {
    id: 5,
    title: "Outros",
    icon: <AiOutlineSync size={30} color="#555" />,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [recentsProducts, setRecentsProducts] = useState<Product[]>([]);
  const [recommendedsProducts, setRecommendedsProducts] = useState<Product[]>(
    []
  );

  const [inputSearch, setInputSearch] = useState("");

  const [isLoadingRecentsProducts, setIsLoadingRecentsProducts] =
    useState(false);
  const [isLoadingRecommendedsProducts, setIsLoadingRecommendedsProducts] =
    useState(false);

  async function getRecentsProducts() {
    setIsLoadingRecentsProducts(true);
    try {
      const response = await getApiRecentsProducts();

      setRecentsProducts(response.data);
    } catch (error) {
      alert("Houve um erro ao buscar produtos recentes");
    }
    setIsLoadingRecentsProducts(false);
  }

  async function getRecommendedsProducts() {
    setIsLoadingRecommendedsProducts(true);
    try {
      const response = await getApiRecommendedsProducts();
      setRecommendedsProducts(response.data);
    } catch (error) {
      alert("Houve um erro ao buscar produtos recomendados");
    }
    setIsLoadingRecommendedsProducts(false);
  }

  useEffect(() => {
    getRecentsProducts();
  }, []);

  useEffect(() => {
    getRecommendedsProducts();
  }, []);

  return (
    <AdminTemplate>
      <div className="max-w-[70%] self-center">
        <Carousel showThumbs={false}>
          <div>
            <img src={caroulsel1} />
          </div>
          <div>
            <img src={caroulsel1} />
          </div>
          <div>
            <img src={caroulsel1} />
          </div>
        </Carousel>

        <div className="flex flex-row h-[45px] rounded-md border-2 items-center mt-10">
          <input
            className="flex-1 h-full p-3"
            placeholder="Estou buscando por..."
            onChange={(event) => setInputSearch(event.target.value)}
          />
          <button
            onClick={() => navigate(`/products/search/${inputSearch}`)}
            className="px-4"
          >
            <IoSearch size={30} />
          </button>
        </div>
      </div>

      <h2 className="mt-[50px]">Itens recentes</h2>
      {isLoadingRecentsProducts && <ListLoading />}
      <div className="flex flex-wrap">
        {recentsProducts.map((product) => (
          <CardProduct
            key={product._id}
            id={product._id}
            name={product.name}
            img={product.url1}
            manufacturer={product.manufacturer}
            price={product.price}
          />
        ))}
        {/* <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct /> */}
      </div>
      <Link to="/all-recents-products">
        <p className="mt-4">Ver todos os produtos recentes</p>
      </Link>

      <div className="bg-primary p-10 rounded-lg mt-[50px]">
        <h2 className="text-white text-[20px] mb-5">Categorias</h2>
        <div className="flex justify-between px-[10%]">
          {itemsCategory.map((category, index) => (
            <button
              key={index}
              onClick={() => navigate("/products/search")}
              className="flex flex-col justify-center items-center"
            >
              <div className="bg-white w-[80px] h-[80px] rounded-full flex justify-center items-center">
                {category.icon}
              </div>
              <span className="text-white mt-2">{category.title}</span>
            </button>
          ))}
        </div>
      </div>

      <h2 className="mt-[50px]">Anúncios</h2>
      {isLoadingRecommendedsProducts && <ListLoading />}
      <div className="flex flex-wrap">
        {recommendedsProducts.map((product) => (
          <CardProduct
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            manufacturer={product.manufacturer}
            img={product.url1}
          />
        ))}
      </div>
      <Link to="/all-products">
        <p className="mt-4">Ver todos os produtos</p>
      </Link>
    </AdminTemplate>
  );
}
