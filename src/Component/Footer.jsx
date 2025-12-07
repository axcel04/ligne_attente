import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Phone, Mail, MapPin, Clock, X } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const [openContact, setOpenContact] = useState(false);

  return (
    <>
      {/* ----- FOOTER ----- */}
      <footer className="bg-white shadow-inner mt-auto py-6 text-center text-gray-600 mb-20">
        <div className="space-x-4">
          <span onClick={() => navigate("/about")} className="hover:text-blue-700 cursor-pointer">
            À propos
          </span>

          {/* Ouvre le MODAL */}
          <span
            onClick={() => setOpenContact(true)}
            className="hover:text-blue-700 cursor-pointer"
          >
            Contact
          </span>

          <span onClick={()=>navigate("/conditions")} className="hover:text-blue-700 cursor-pointer">
            Conditions d’utilisation
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          © 2025 - Hôpital National de Bujumbura
        </p>
      </footer>

      {/* ----- MODAL CONTACT ----- */}
      {openContact && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">

            {/* Close button */}
            <button
              onClick={() => setOpenContact(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">
              Contact
            </h2>

            {/* Infos uniquement */}
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-600" />
                <span>Bujumbura, Burundi</span>
              </p>

              <p className="flex items-center gap-3">
                <Phone size={20} className="text-blue-600" />
                <span>+257 61 00 00 00</span>
              </p>

              <p className="flex items-center gap-3">
                <Mail size={20} className="text-blue-600" />
                <span>support@hopital.bi</span>
              </p>

              <p className="flex items-center gap-3">
                <Clock size={20} className="text-blue-600" />
                <span>Lundi – Samedi : 07h30 – 17h00</span>
              </p>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setOpenContact(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
