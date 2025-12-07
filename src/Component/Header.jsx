import React from "react";
import { Bell } from "lucide-react"; // On utilise lucide-react pour les icônes
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo et Nom */}
      <div className="flex items-center space-x-3">
        <img
          src="/assets/hopital_logo.png" // Remplace par ton logo
          alt="Logo Hôpital"
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-2xl font-bold text-blue-700">
          Hôpital National de Bujumbura
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
      </div>
    </header>
  );
}
