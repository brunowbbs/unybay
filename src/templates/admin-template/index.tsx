import { PropsWithChildren, useEffect } from "react";
import Footer from "../../components/footer";
import HeaderAdmin from "../../components/header-admin";
import { useAuthSessionStore } from "../../hooks/use-auth-session";
import { useNavigate } from "react-router-dom";

type AdminTemplateProps = PropsWithChildren & {};

export default function AdminTemplate(props: AdminTemplateProps) {
  const { token } = useAuthSessionStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderAdmin />

      <div className="flex flex-1 flex-col px-[10%] py-[20px] justify-center">
        {props.children}
      </div>

      <Footer />
    </div>
  );
}
