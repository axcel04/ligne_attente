import React, { useState, useEffect, use } from "react";
import { Users, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../api";
import { format, parseISO} from "date-fns";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";

export default function ArchiveAgent() {
  const api = useApi();
  const { logout } = useAuth();
  const { API_URL } = useAppContext();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch services
  useEffect(() => {
    api.get(`${API_URL}/service`)
      .then(res => {
        setServices(res.data);
        setActiveService(res.data[0]); // auto-select first service
      })
      .catch(err => console.error("Erreur services:", err));
  }, []);

  // Fetch all tickets for selected service
  useEffect(() => {
    if (!activeService?.id) return;
    api.get(`${API_URL}/ticket/service/${activeService.id}`)
      .then(res => setTickets(res.data))
      .catch(err => console.error("Erreur tickets:", err));
  }, [activeService]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Filter tickets for search
  const filteredTickets = tickets.filter(t =>
    t.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    t.number?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center md:px-4 lg:px-8 py-6">
      <main className="w-full max-w-6xl">

        {/* Header + Search */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Archive</h2>
              <p className="text-gray-500">{tickets.length} patients archivés</p>
            </div>
          </div>

          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par numéro ou nom…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border shadow focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Service selection */}
        <div className="mb-4 flex flex-wrap gap-2">
          {services.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveService(s)}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeService?.id === s.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 max-w-full mx-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Servi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    Aucun patient archivé pour ce service.
                  </td>
                </tr>
              ) : (
                filteredTickets.map(t => (
                  <tr key={t.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{activeService?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-700">{t.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{t.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{ format(parseISO(t.created_at), "dd MMMM yyyy HH:mm")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}