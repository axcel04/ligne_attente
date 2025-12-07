import React from "react";

export default function ServiceCard({ service, onClick }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 flex flex-col justify-between space-y-4">
      <h3 className="text-lg font-bold text-gray-700">{service.name}</h3>
      <button
        onClick={() => onClick(service)}
        className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Prendre un ticket
      </button>
    </div>
  );
}
