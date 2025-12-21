import { Bell, LucideLogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Users, ListOrdered } from "lucide-react";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo et Nom */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-1 text-white border-2 border-yellow-300 bg-blue-600 p-2 rounded-full">
          <Users className="h-6 w-6" />
          <ListOrdered className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-blue-700">
          File d'attente (Hôpital)
        </h1>
      </div>

      {/* Notification */}
      <div className="relative">
        <button onClick={()=>navigate("/notifications")} className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className=" md:hidden w-6 h-6 text-gray-700" />
          <span className="hidden md:block">notification</span>
          {/* Badge notification */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            3 {/* Nombre de notifications à remplacer dynamiquement */}
          </span>
        </button>
        {/* logout button */}
        <LucideLogOut
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="ml-4 w-6 h-6 text-red-600 hover:text-red-800 cursor-pointer"
        />
      </div>
    </header>
  );
}
