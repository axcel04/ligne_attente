import React, { useState } from "react";
import { Users, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ArchiveAgent() {
  const navigate = useNavigate();

  const services = [
    "Consultation Générale",
    "Laboratoire",
    "Radiologie",
    "Urgence",
  ];

  const [activeService, setActiveService] = useState(services[0]);
  const [search, setSearch] = useState("");

  const [archiveData] = useState({
    "Consultation Générale": [
      { id: 1, number: "A12", name: "Jean Claude", dateServed: "2025-12-01" },
      { id: 2, number: "A13", name: "Alice", dateServed: "2025-12-02" },
    ],
    Laboratoire: [
      { id: 3, number: "L01", name: "Patrick", dateServed: "2025-12-03" },
    ],
    Radiologie: [],
    Urgence: [
      { id: 4, number: "U11", name: "Sophie", dateServed: "2025-12-01" },
    ],
  });

  const patients = archiveData[activeService] || [];

  const handleLogout = () => {
    localStorage.removeItem("authRole");
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center md:px-4 lg:px-8 py-6">
      <main className="w-full max-w-6xl">
        {/* Service Header + Search */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Archive</h2>
              <p className="text-gray-500">{patients.length} patients archivés</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par numéro ou nom…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border shadow focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 max-w-full mx-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numéro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Servi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    Aucun patient archivé pour ce service.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-700">
                      {p.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{p.dateServed}</td>
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
