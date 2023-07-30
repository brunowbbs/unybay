import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-primary flex justify-between items-center p-2">
      <button onClick={() => navigate("/")}>
        <h1 className="text-white text-[30px] font-bold">Unybay</h1>
      </button>

      <ul className="flex gap-5 items-center text-white">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#">Quem somos</Link>
        </li>
        <li>
          <button
            onClick={() => navigate("/login")}
            className="bg-secondary px-8 py-2 rounded-md transition-all hover:bg-orange-600"
          >
            Entrar
          </button>
        </li>
      </ul>
    </div>
  );
}
