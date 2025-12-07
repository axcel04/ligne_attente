import React, { useState } from "react";
import { X, User, Phone, MapPin, Briefcase, VenetianMask } from "lucide-react";

export default function ModalTicket({ show, onClose, service }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
  });

  if (!show) return null;

  // 🔥 Génère un numéro de ticket unique : EX -> LAB-001
  const generateTicketNumber = () => {
    const key = `tickets-${service.id}`;

    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const nextNumber = existing.length + 1;

    return `${service.shortCode}-${String(nextNumber).padStart(3, "0")}`;
  };

  // 🔥 Sauvegarde dans localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketNumber = generateTicketNumber();

    const ticket = {
      id: Date.now(),
      service: service.name,
      serviceId: service.id,
      number: ticketNumber,
      ...form,
      date: new Date().toISOString().slice(0, 10),
    };

    const key = `tickets-${service.id}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push(ticket);
    localStorage.setItem(key, JSON.stringify(existing));

    alert(`Ticket généré : ${ticketNumber}`);

    // Reset + fermeture
    setForm({ name: "", contact: "", sexe: "", fonction: "", address: "" });
    onClose();
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative animate-scaleIn">
        
        {/* ❌ Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-blue-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* 🧾 Titre */}
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          Prendre un ticket – 
          <span className="text-blue-600">{service.name}</span>
        </h2>

        {/* Formulaire */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Nom */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Nom complet"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          {/* Contact */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Téléphone"
              value={form.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          {/* address */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-300"
          >
            Générer le ticket
          </button>
        </form>
      </div>
    </div>
  );
}
