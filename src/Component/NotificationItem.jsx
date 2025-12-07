export default function NotificationItem({ notif, onRead }) {
  return (
    <div
      className={`p-4 rounded-xl shadow-sm border mb-3 transition 
        ${notif.read ? "bg-gray-100" : "bg-blue-50 border-blue-300"}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-800">{notif.title}</h3>
          <p className="text-gray-600 mt-1">{notif.message}</p>
          <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
        </div>

        {!notif.read && (
          <button
            onClick={() => onRead(notif.id)}
            className="text-blue-600 font-semibold text-sm"
          >
            Marquer lu
          </button>
        )}
      </div>
    </div>
  );
}
