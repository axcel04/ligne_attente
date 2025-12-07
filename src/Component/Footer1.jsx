import React from "react";
import { HomeIcon, TicketIcon, ClockIcon } from "lucide-react"; // si tu utilises lucide-react
import { useNavigate } from "react-router-dom";

export default function Footer1() {
   const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t border-gray-200">
      <div className="flex justify-around items-center py-3">
        
        {/* Prendre un ticket */}
        <button onClick={()=>navigate("/servicesPage")} className="flex flex-col items-center text-gray-700 hover:text-blue-600">
          <TicketIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Ticket</span>
        </button>

        {/* Home */}
        <button onClick={()=>navigate("/home")} className="flex flex-col items-center text-gray-700 hover:text-blue-600">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>

        {/* Historique */}
        <button onClick={()=>navigate("/history")} className="flex flex-col items-center text-gray-700 hover:text-blue-600">
          <ClockIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Historique</span>
        </button>

      </div>
    </footer>
  );
}
