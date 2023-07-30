import UserTemplate from "../../templates/user-template";

export default function NotFound() {
  return (
    <UserTemplate>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-center text-[20px] mt-10">Página nao encontrada</h1>
      </div>
    </UserTemplate>
  );
}
