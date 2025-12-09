import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useApi } from "../api";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../utils/showToast";
import { X, User, Phone, MapPin } from "lucide-react";

export default function ModalTicket({ show, onClose, service }) {
  const api = useApi();
  const { user } = useAuth()
  const { API_URL, msg, error, setError, setMsg } = useAppContext();
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    address: "",
    serviceId: service.id,
    userId: user.id
  });

  if (!show) return null;

  useEffect(() => {
    if (msg) {
      showToast(msg, "success");
    }
    if (error) {
      showToast(error, "error");
    }
  }, [msg, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post(`${API_URL}/ticket`,form)
      .then((response) => {
        setMsg("Ticket généré avec succès !");
        setForm({ name: "", contact: "", sexe: "", fonction: "", address: "" });
        onClose();
      })
      .catch((error) => {
        console.error("Erreur lors de la création du ticket :", error);
        setError("Échec de la génération du ticket. Veuillez réessayer.");
      }); 
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
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
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
