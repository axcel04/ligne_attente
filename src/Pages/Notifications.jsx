import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import NotificationItem from "../Component/NotificationItem";
import Footer1 from "../Component/Footer1";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Votre tour approche",
      message: "Vous êtes maintenant le numéro 2 dans la file du service Radiologie.",
      time: "Il y a 5 minutes",
      read: false,
    },
    {
      id: 2,
      title: "Ticket confirmé",
      message: "Votre ticket A12 pour Consultation Générale est confirmé.",
      time: "Aujourd'hui, 08:23",
      read: true,
    },
    {
      id: 3,
      title: "Mise à jour",
      message: "Délai estimé mis à jour : 10 minutes restantes.",
      time: "Hier, 16:02",
      read: true,
    },
  ]);

  // Marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Marquer toutes comme lues
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
    <Header />
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Notifications</h2>

          <button
            onClick={markAllRead}
            className="text-blue-600 font-semibold hover:underline"
          >
            Tout marquer lu
          </button>
        </div>

        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Aucune notification</p>
        ) : (
          notifications.map((notif) => (
            <NotificationItem key={notif.id} notif={notif} onRead={markAsRead} />
          ))
        )}
      </main>
    </div>
    <Footer />
    <Footer1 />
    </>
  );
}
