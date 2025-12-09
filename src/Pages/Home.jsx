import { useState, useEffect } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Footer1 from "../Component/Footer1";
import { Bell } from "lucide-react";
import { useApi } from "../api";
import { useAppContext } from "../context/AppContext";
import { showToast } from "../utils/showToast";

export default function Home() {
  const { API_URL, error, msg, setError, setMsg } = useAppContext();
  const api = useApi()
  const [ticket, setTicket] = useState({});
  const [notify, setNotify] = useState(false);
  const [position, setPosition] = useState(null);

   useEffect(() => {
    if (msg) {
      showToast(msg, "success");
    }
    if (error) {
      showToast(error, "error");
    }
  }, [msg, error]);

  const getTicket = () => {
    api.get(`${API_URL}/ticket`)
      .then((response) => {
        // get latest 
        const latestTicket = response.data.slice(-1)[0];
        // calculate position base on other t with status en_attente and created before latestTicket
        const pos = response.data.filter(t => t.status === 'en_attente' && new Date(t.created_at) < new Date(latestTicket.created_at)).length + 1;
        latestTicket.pos = pos;
        // if position is 1 set notify to true after 5 seconds
        if(pos === 1){
          setTimeout(() => {
            setNotify(true);
          }, 5000);
        }
        setPosition(pos);
        setTicket(latestTicket);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du ticket :", error);
      });
  }
  useEffect(() => {
    getTicket()
  },[])

  const cancelTicket = () => {
    api.put(`${API_URL}/ticket/${ticket.id}/status`, { status: 'annulee' })
      .then((response) => {
        setMsg("Ticket annulé avec succès !");
        getTicket()
      })
      .catch((error) => {
        setError("Échec de l'annulation du ticket. Veuillez réessayer.");
      });
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 flex flex-col pb-20">

      <main className="flex-1 flex justify-center items-center p-2">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-700 text-center">
            Suivi de votre Ticket
          </h2>

          <div className="relative p-6 bg-blue-50 rounded-xl space-y-4">
            <span className="absolute top-6 right-2 px-2 py-1 text-yellow-600 bg-yellow-100 rounded-full">{ticket.status}</span>
            {/* Numéro du ticket */}
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-700">{`A0${ticket.id}`}</h3>
              <p className="text-gray-600 mt-1 text-sm">Numéro de ticket</p>
            </div>

            {/* Nom du service */}
            <div className="text-center">
              <p className="text-gray-700 font-semibold">{ticket.service}</p>
            </div>

            {/* Position */}
            <div className="text-center text-gray-700 font-semibold">
              Position dans la file : {position !== null ? position : '...'}
            </div>

            {/* Notification */}
            {notify && (
              <div className="mt-3 p-3 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
                <Bell />🔔 Vous allez être appelé bientôt !
              </div>
            )}
            <div onClick={cancelTicket} className="absolute bottom-4 right-2 px-2 text-red-500 bg-red-100 rounded-full">
               <bouton>Annulé</bouton>
            </div>
          </div>
        </div>
      </main>
    </div>
      <Footer />
      <Footer1 />
    </>
  );
}
