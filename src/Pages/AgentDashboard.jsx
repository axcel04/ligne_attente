import React, { useState, useEffect } from "react";
import {Users, Ticket, CheckCircle2, Activity, Search, LogOut,ArrowRightCircle, Bell, Menu, X, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApi } from '../api';
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import ArchiveAgent from "./ArchiveAgent";

export default function AgentDashboard() {
  const api = useApi();
  const { logout } = useAuth();
  const { API_URL } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agentMode, setAgentMode] = useState(false);

  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch services on mount
  useEffect(() => {
    api.get(`${API_URL}/service`)
      .then(res => {
        setServices(res.data);
        setActiveService(res.data[0]); // auto-select first service
      })
      .catch(err => console.error("Erreur services:", err));
  }, []);

  // Fetch tickets when activeService changes
  useEffect(() => {
    if (!activeService?.id) return;

    api.get(`${API_URL}/ticket/service/${activeService.id}`)
      .then(res => setTickets(res.data))
      .catch(err => console.error("Erreur tickets:", err));

  }, [activeService]);

  // Mobile screen detection
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCall = () => {
    const next = tickets.find(t => t.status === "waiting");
    if (!next) return alert("Aucun patient en attente.");

    api.put(`${API_URL}/ticket/${next.id}/status`, { status: "called" })
      .then(() => {
        setTickets(prev =>
          prev.map(t => t.id === next.id ? { ...t, status: "called" } : t)
        );
      });
  };

  const handleServed = (id) => {
    api.put(`${API_URL}/ticket/${id}/status`, { status: "served" })
      .then(() => {
        setTickets(prev =>
          prev.map(t => t.id === id ? { ...t, status: "served" } : t)
        );
      });
  };

  const nextTicket = tickets.find(t => t.status === "waiting");

  const handleServiceChange = (service) => {
    setAgentMode(false);
    setActiveService(service);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-3">
          {isMobile && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
          <img src="/logo-hopt.png" alt="Logo" className="h-10 w-10" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-800">
              Tableau de bord
            </h1>
            <span className="text-blue-600 font-semibold text-sm">
              {activeService?.name || "Sélectionner un service"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-gray-100 md:hidden">
            <Home className="h-5 w-5" />
          </button>

          {/* Bell notification */}
          <button className="relative p-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
              {tickets.filter(t => t.status === "waiting").length}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-md p-4 z-40 
          transition-all duration-300
          ${sidebarOpen ? "left-0" : "-left-full"}
          md:left-0
        `}
      >
        <h2 className="text-lg font-bold mb-6 px-2">Services</h2>
        <ul className="space-y-1">
          {services.map(s => (
            <li key={s.id}>
              <button
                onClick={() => handleServiceChange(s)}
                className={`w-full text-left p-3 rounded-lg font-medium 
                  ${activeService?.id === s.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 border-t">
          <button
            onClick={() => { setAgentMode(true); setSidebarOpen(false); }}
            className="w-full text-left p-3 rounded-lg font-medium hover:bg-gray-100 mb-2"
          >
            Archive
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`pt-16 px-4 pb-6 ${!isMobile ? "ml-64" : ""}`}>
        {agentMode ? (
          <ArchiveAgent />
        ) : (
          <div className="max-w-4xl mx-auto">

            {/* STATS */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4">
              {[
                {
                  icon: Users,
                  color: "text-blue-600",
                  label: "En attente",
                  value: tickets.filter(t => t.status === "waiting").length,
                },
                {
                  icon: Ticket,
                  color: "text-green-600",
                  label: "Appelé",
                  value: tickets.filter(t => t.status === "called").length,
                },
                {
                  icon: CheckCircle2,
                  color: "text-purple-600",
                  label: "Servi",
                  value: tickets.filter(t => t.status === "served").length,
                },
                {
                  icon: Activity,
                  color: "text-orange-600",
                  label: "Total",
                  value: tickets.length,
                },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-3 rounded-xl shadow flex items-center gap-3">
                  <stat.icon className={`${stat.color} h-6 w-6 md:h-8 md:w-8`} />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                    <h2 className="text-lg md:text-xl font-bold">{stat.value}</h2>
                  </div>
                </div>
              ))}
            </section>

            {/* SEARCH */}
            <div className="mt-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un numéro ou nom…"
                className="w-full pl-10 pr-4 py-3 rounded-xl border shadow focus:ring-2 focus:ring-blue-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* NEXT PATIENT */}
            {nextTicket && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-6 p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold">Prochain patient</h3>
                  <p className="text-base md:text-lg mt-1">
                    {nextTicket.number} — {nextTicket.fullName}
                  </p>
                </div>
                <button
                  onClick={handleCall}
                  className="bg-white text-blue-700 px-4 py-3 rounded-xl font-semibold shadow hover:bg-blue-50 w-full md:w-auto"
                >
                  <ArrowRightCircle className="h-5 w-5 inline mr-2" />
                  Appeler
                </button>
              </div>
            )}

            {/* WAITING LIST */}
            <section className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Liste d'attente</h2>
                <span className="text-sm text-gray-500">{tickets.length} patient(s)</span>
              </div>

              <div className="space-y-3">
                {tickets
                  .filter(t =>
                    t.fullName.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(t => (
                    <div key={t.id} className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-lg">
                          {t.number || t.id}
                        </div>
                        <p className="font-medium text-gray-700">{t.fullName}</p>
                      </div>

                      <div className="flex justify-end">
                        {t.status === "waiting" && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            En attente
                          </span>
                        )}

                        {t.status === "called" && (
                          <button
                            onClick={() => handleServed(t.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold text-sm"
                          >
                            Marquer Servi
                          </button>
                        )}

                        {t.status === "served" && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" /> Servi
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                {tickets.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun patient en attente pour ce service
                  </div>
                )}
              </div>
            </section>

            {/* Floating button */}
            {nextTicket && isMobile && (
              <button
                onClick={handleCall}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-30 hover:bg-blue-700"
              >
                <ArrowRightCircle className="h-6 w-6" />
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}