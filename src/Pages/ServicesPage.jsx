import React, { useState } from "react";
import ServiceCard from "../Component/ServiceCard";
import ModalTicket from "../Component/ModalTicket";
import { services } from "../data/services";
import Footer1 from "../Component/Footer1";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>

    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onClick={handleOpenModal} />
        ))}
      </main>

      {selectedService && (
        <ModalTicket show={modalOpen} service={selectedService} onClose={handleCloseModal} />
      )}

      <Footer />
      <Footer1 />
    </div>
    </>
  );
}
