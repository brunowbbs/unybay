import { useForm } from "react-hook-form";
import AdminTemplate from "../../templates/admin-template";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { saveApiProduct } from "./services";
import { useAuthSessionStore } from "../../hooks/use-auth-session";

export type FormProduct = {
  name: string;
  manufacturer: string;
  category: string;
  price: number;
  url1: string;
  url2: string;
  description?: string;
};

const schemaValidation = Yup.object().shape({
  name: Yup.string().required("O campo é obrigatório"),
  manufacturer: Yup.string().required("O campo é obrigatório"),
  category: Yup.string().required("O campo é obrigatório"),
  price: Yup.number().required("O campo é obrigatório"),
  url1: Yup.string().required("O campo é obrigatório"),
  url2: Yup.string().required("O campo é obrigatório"),
});

export default function FormProduct() {
  const { token } = useAuthSessionStore();
  const [value, setValue] = useState("");

  async function saveProduct(values: FormProduct) {
    try {
      await saveApiProduct({ ...values, description: value }, token);
      alert("Produto cadastrado com sucesso");
    } catch (error) {
      alert("Erro ao cadastrar produto");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProduct>({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      price: 0,
      category: "",
      description: "",
      manufacturer: "",
      name: "",
      url1: "",
      url2: "",
    },
  });

  // const category =  getValues("category")

  return (
    <AdminTemplate>
      <form onSubmit={handleSubmit(saveProduct)}>
        <h1 className="text-[25px] mb-4">Novo Produto</h1>
        <div className="flex gap-2">
          <div className="flex-1 ">
            <input
              {...register("name")}
              className="w-full border-2  mt-2 h-[40px] px-2 rounded-md"
              placeholder="Nome do Produto"
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>

          <div className="flex-1">
            <input
              {...register("manufacturer")}
              className="w-full border-2  mt-2 h-[40px] px-2 rounded-md"
              placeholder="Nome do Fabricante"
            />
            {errors.manufacturer && (
              <span className="text-red-600">
                {errors.manufacturer.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <select
              {...register("category")}
              placeholder="Categoria"
              className="w-full border-2  mt-2 h-[40px] px-2 rounded-md"
            >
              <option disabled value="">
                Selecione uma opção
              </option>
              <option value={"Jogos"}>Jogos</option>
              <option value={"Roupas"}>Roupas</option>
              <option value={"Veiculos"}>Veículos</option>
            </select>
            {/* <input
              {...register("category")}
              className="w-full border-2  mt-2 h-[40px] px-2 rounded-md"
              placeholder="Categoria"
            /> */}
            {errors.category && (
              <span className="text-red-600">{errors.category.message}</span>
            )}
          </div>

          <div className="flex-1">
            <input
              {...register("price")}
              placeholder="Preço"
              className="w-full border-2  mt-2 h-[40px] px-2 rounded-md"
            />
            {errors.price && (
              <span className="text-red-600">{errors.price.message}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              {...register("url1")}
              placeholder="URL da imagem"
              className="w-full border-2  mt-2 h-[40px] px-2 rounded-md"
            />
            {errors.url1 && (
              <span className="text-red-600">{errors.url1.message}</span>
            )}
          </div>

          <div className="flex-1">
            <input
              {...register("url2")}
              placeholder="URL da imagem"
              className="w-full border-2  mt-2 h-[40px] px-2 rounded-md"
            />
            {errors.url2 && (
              <span className="text-red-600">{errors.url2.message}</span>
            )}
          </div>
        </div>
        <ReactQuill
          theme="snow"
          style={{ height: 500, marginTop: 10, marginBottom: 100 }}
          value={value}
          onChange={setValue}
        />
        {/* <button
          className="mt-4 bg-primary w-full h-[40px] text-white"
          type="submit"
        >
          Salvar
        </button> */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 rounded-lg"
          >
            Salvar
          </button>
          <button
            onClick={() => alert("")}
            className="bg-white text-primary border border-primary px-8 py-2 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </form>
    </AdminTemplate>
  );
}
