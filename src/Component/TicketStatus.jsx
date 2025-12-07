export default function TicketStatus() {
  const ticketNumber = "A042";
  const position = 5;
  const waitTime = 12; // minutes
  const totalPeople = 20;

  const progress = ((totalPeople - position) / totalPeople) * 100;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Suivre ma position en temps réel
      </h2>

      <div className="mb-4">
        <p className="text-gray-500">Numéro de ticket</p>
        <p className="text-2xl font-bold">{ticketNumber}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-500">Position dans la file</p>
        <p className="text-xl font-semibold">{position} / {totalPeople}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-500">Temps estimé restant</p>
        <p className="text-xl font-semibold">{waitTime} min</p>
      </div>

      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {position <= 3 && (
        <p className="mt-3 text-blue-600 font-medium">
          🔔 Vous êtes bientôt appelé !
        </p>
      )}
    </div>
  );
}
