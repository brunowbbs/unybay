import { useNavigate } from "react-router-dom";

import { CardProps } from "./types";

export default function CardProduct(props: CardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/products/details/${props.id}`)}
      className="shadow-md mx-2 w-[260px] rounded-md p-10 flex flex-col justify-center items-center"
    >
      <h1 className="text-center">{props.name}</h1>

      <img src={props.img} className="w-[100px] mt-2" />

      <p className=" w-full mt-3">{props.manufacturer}</p>
      <p className="w-full text-[25px]">R$ {props.price}</p>
    </button>
  );
}
