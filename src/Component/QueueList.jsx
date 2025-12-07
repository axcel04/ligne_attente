import { useEffect, useState } from "react";

export default function QueueList() {
  const [tickets, setTickets] = useState([]);

  async function loadTickets() {
    const res = await fetch("http://localhost:3000/api/tickets");
    const data = await res.json();
    setTickets(data);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">File d'Attente</h2>

      <button
        onClick={loadTickets}
        className="mb-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Actualiser
      </button>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Numéro</th>
            <th className="p-2 border">Client</th>
            <th className="p-2 border">Service</th>
            <th className="p-2 border">Statut</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="text-center">
              <td className="border p-2">{t.numero}</td>
              <td className="border p-2">{t.clientName}</td>
              <td className="border p-2">{t.service}</td>
              <td className="border p-2">{t.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
