import { useNavigate } from "react-router-dom";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import Modal from "react-modal";
import { useState } from "react";
import { CardProps } from "./types";
import { removeApiProduct } from "./services";
import { getApiMyProducts } from "../../pages/user-products/services";
import { useAuthSessionStore } from "../../hooks/use-auth-session";

const customStyles = {
  overlay: {
    background: "rgba(0,0,0,0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function CardProductAdmin(props: CardProps) {
  const { token } = useAuthSessionStore();
  const [modalIsOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  async function removeProduct() {
    try {
      await removeApiProduct(props.id, token);
      const response = await getApiMyProducts(token);
      props.setMyProducts(response.data);
      setIsOpen(false);
      alert("Produto foi removido com sucesso");
    } catch (error) {
      alert("erro ao remover produto");
    }
  }

  return (
    <div>
      <button
        // onClick={() => navigate("/products/details")}
        className="shadow-md rounded-md p-6 flex flex-col justify-center items-center"
      >
        <h1 className="text-center">{props.name}</h1>

        <img src={props.img} className="w-[100px] mt-2" />

        <div className="flex items-end flex-row">
          <div>
            <p className=" w-full mt-3">{props.manufacturer}</p>
            <p className="w-full text-[25px]">R$ {props.price}</p>
          </div>
          <div className="ml-2 flex flex-col gap-1">
            <button onClick={() => navigate(`/form-product-edit/${props.id}`)}>
              <AiOutlineEdit size={25} />
            </button>
            <button onClick={() => setIsOpen(true)}>
              <AiOutlineDelete size={25} />
            </button>
          </div>
        </div>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <h1 className="text-[20px] font-bold mb-2">Excluir produto</h1>
        <p>Deseja realmente excluir este produto?</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={removeProduct}
            className="bg-primary text-white px-8 py-2 rounded-lg"
          >
            Sim
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-white text-primary border border-primary px-8 py-2 rounded-lg"
          >
            Não
          </button>
        </div>
      </Modal>
    </div>
  );
}
