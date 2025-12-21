import { useEffect, useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Footer1 from "../Component/Footer1";
import { XCircle } from "lucide-react";
import { useApi } from "../api";
import { useAppContext } from "../context/AppContext";
import { showToast } from "../utils/showToast";

export default function Home() {
  const { API_URL, error, msg, setError, setMsg } = useAppContext();
  const api = useApi();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (msg) showToast(msg, "success");
    if (error) showToast(error, "error");
  }, [msg, error]);

  const loadTickets = async () => {
    try {
      const res = await api.get(`${API_URL}/ticket/me`);
      const pendingTickets = res.data.filter(
        (t) => t.status === "en_attente"
      );

      // Calcul des positions
      const sorted = pendingTickets.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      const withPosition = sorted.map((t, index) => ({
        ...t,
        position: index + 1,
      }));

      setTickets(withPosition);
    } catch (err) {
      setError("Impossible de charger les tickets");
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const cancelTicket = async (id) => {
    try {
      await api.put(`${API_URL}/ticket/${id}/status`, {
        status: "annulee",
      });
      setMsg("Ticket annulé avec succès");
      loadTickets();
    } catch {
      setError("Erreur lors de l'annulation");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 pb-24">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🎫 File d’attente – Tickets en cours
          </h1>

          {tickets.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
              Aucun ticket en attente
            </div>
          ) : (
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-lg transition"
                >
                  {/* Infos */}
                  <div>
                    <h2 className="text-lg font-bold text-blue-700">
                      Ticket A0{ticket.id}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Service : {ticket.Service?.name || "—"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Position :{" "}
                      <span className="font-semibold text-gray-700">
                        {ticket.position}
                      </span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      EN ATTENTE
                    </span>

                    <button
                      onClick={() => cancelTicket(ticket.id)}
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                    >
                      <XCircle size={18} />
                      Annuler
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <Footer1 />
    </>
  );
}
