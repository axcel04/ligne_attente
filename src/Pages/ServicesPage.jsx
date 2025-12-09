import React, { useEffect, useState } from "react";
import { Users, Activity, Stethoscope, TestTube, AlertCircle } from "lucide-react"; // icônes Lucide
import ModalTicket from "../Component/ModalTicket";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Footer1 from "../Component/Footer1";
import { useApi } from "../api"
import { useAppContext } from "../context/AppContext";


export default function ServicesPage() {
  const api = useApi();
  const { API_URL, DIR_URL, setError, setMsg } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get(`${API_URL}/service`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des services :", error);
        setError("Erreur lors de la récupération des services. Veuillez recharger la page.");
      }); 
  }, []);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Message d'accueil */}
      <div className="text-center py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Bienvenue dans nos services
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl">
          Sélectionnez un service pour prendre un ticket rapidement et facilement.
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center p-6 text-center"
          >
            {/* Icon Lucide */}
            <img src={`${DIR_URL}/${service.image}`} alt={service.name} className="h-12 w-12 object-cover rounded"/>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{service.name}</h3>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">{service.description}</p>

            {/* Bouton */}
            <button
              onClick={() => handleOpenModal(service)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              Prendre un ticket
            </button>
          </div>
        ))}
      </main>

      {/* Modal */}
      {selectedService && (
        <ModalTicket
          show={modalOpen}
          service={selectedService}
          onClose={handleCloseModal}
        />
      )}

      {/* Footer */}
      <Footer />
      <Footer1 />
    </div>
  );
}
