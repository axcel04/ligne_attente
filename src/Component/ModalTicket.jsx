import React from "react";

export default function ModalTicket({ show, onClose, service }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Prendre un ticket - {service.name}</h2>

        <form className="space-y-4">
          <input type="text" placeholder="Nom complet" className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Téléphone ou Email" className="w-full p-2 border rounded" required />
          
          <select className="w-full p-2 border rounded" required>
            <option value="">Sexe</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>

          <input type="text" placeholder="Fonction" className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Adresse" className="w-full p-2 border rounded" required />
          <input type="date" placeholder="Date" className="w-full p-2 border rounded" required />


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Prendre un ticket
          </button>
        </form>
      </div>
    </div>
  );
}
