import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Footer1 from "../Component/Footer1";
import { Bell } from "lucide-react";

export default function Home() {
  const [ticket, setTicket] = useState({
    number: "A12",
    service: "Consultation Général",
    position: 1, // Si position = 1, notification izahita igaragara
    stutus: "En attente",
  });

  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (ticket.position <= 1) {
      setNotify(true); // Notification automatique
    }
  }, [ticket]);

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 flex flex-col pb-20">

      <main className="flex-1 flex justify-center items-center p-2">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-700 text-center">
            Suivi de votre Ticket
          </h2>

          <div className="relative p-6 bg-blue-50 rounded-xl space-y-4">
            <span className="absolute top-6 right-2 px-2 py-1 text-yellow-600 bg-yellow-100 rounded-full">{ticket.stutus}</span>
            {/* Numéro du ticket */}
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-700">{ticket.number}</h3>
              <p className="text-gray-600 mt-1 text-sm">Numéro de ticket</p>
            </div>

            {/* Nom du service */}
            <div className="text-center">
              <p className="text-gray-700 font-semibold">{ticket.service}</p>
            </div>

            {/* Position */}
            <div className="text-center text-gray-700 font-semibold">
              Position dans la file : {ticket.position}
            </div>

            {/* Notification */}
            {notify && (
              <div className="mt-3 p-3 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
                <Bell />🔔 Vous allez être appelé bientôt !
              </div>
            )}
            <div onClick={()=> setTicket("")} className="absolute bottom-4 right-2 px-2 text-red-500 bg-red-100 rounded-full">
               <bouton>Annulé</bouton>
            </div>
          </div>
        </div>
      </main>
    </div>
      <Footer />
      <Footer1 />
    </>
  );
}
