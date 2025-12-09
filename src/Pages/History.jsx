import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "../Component/Header";
import Footer1 from "../Component/Footer1";
import Footer from "../Component/Footer";
import { useAppContext } from "../context/AppContext";
import { useApi } from "../api";

export default function History() {
  const { API_URL } = useAppContext();
  const api = useApi();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api
      .get(`${API_URL}/ticket`)
      .then((response) => {
        // map tickets to desired format 
        console.log(response.data);
        const mappedTickets = response.data.map((t) => ({
          id: t.id,
          service: t.Service.name,
          date: new Date(t.created_at).toLocaleString(),
          position: `A0${t.id}` || null,
          status: t.status,
        }));
        setTickets(mappedTickets);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tickets :", error);
      });
  }, []);



  const getStatusStyle = (status) => {
    switch (status) {
      case "en_attente":
        return "text-yellow-600 bg-yellow-100";
      case "servi":
        return "text-green-600 bg-green-100";
      case "annule":
        return "text-red-600 bg-red-100";
      default:
        return "";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "en_attente":
        return "En attente";
      case "servi":
        return "Servi";
      case "annule":
        return "Annulé";
      default:
        return "";
    }
  };

  return (
    <>
    <Header />
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Historique de vos Tickets
      </h1>

      {/* Desktop View */}
      <div className="hidden md:block bg-white shadow rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Ticket</th>
              <th className="p-2">Service</th>
              <th className="p-2">Date</th>
              <th className="p-2">Position</th>
              <th className="p-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-2 font-bold">{t.id}</td>
                <td className="p-2">{t.service}</td>
                <td className="p-2">{t.date}</td>
                <td className="p-2">{t.position || "-"}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                      t.status
                    )}`}
                  >
                    {getStatusLabel(t.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3 mt-3">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">{t.id}</p>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                  t.status
                )}`}
              >
                {getStatusLabel(t.status)}
              </span>
            </div>

            <p className="text-gray-700 mt-1">{t.service}</p>

            <div className="flex items-center text-gray-500 gap-2 mt-2">
              <Clock className="w-4 h-4" />
              <span>{t.date}</span>
            </div>

            <div className="mt-2">
              {t.status === "en_attente" ? (
                <p className="text-blue-600 font-semibold">
                  Position actuelle : {t.position}
                </p>
              ) : t.status === "servi" ? (
                <p className="text-green-600 font-semibold">Ticket servi</p>
              ) : (
                <p className="text-red-600 font-semibold">Ticket annulé</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    <Footer1 />
    </>
  );
}
