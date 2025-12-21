import { useEffect } from "react";
import Header from "./Component/Header";
import Home from "./Pages/Home";
import ServicesPage from "./Pages/ServicesPage";
import Notifications from "./Pages/Notifications";
import History from "./Pages/History";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Conditions from "./Pages/Conditions";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AgentDashboard from "./Pages/AgentDashboard";
import ArchiveAgent from "./Pages/ArchiveAgent";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Component/UnAuthorized";
import { useAuth } from "./context/AuthContext";
import { useAppContext } from "./context/AppContext";
import { showToast } from "./utils/showToast";

// register socket.io

export default function App() {
  const { user } = useAuth();
  const { error, msg, setMsg, socket } = useAppContext(); 
    useEffect(() => {
      if (msg) {
        showToast(msg, "success");
      }
      if (error) {
        showToast(error, "error");
      }
    }, [msg, error]);

    useEffect(() => {
      if (!user) return; // wait until user is defined

      socket.emit('joinRoom', `user_${user.id}`)

      socket.on('notification', (data) => {
        console.log('Notification:', data)
        setMsg(data.message)
      })

      return () => socket.off('notification') // cleanup
    }, [user])


  return (<>
    <div id="toast-root" className="fixed top-5 right-5 z-[9999] space-y-3"></div>
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<ProtectedRoute allowedRoles={['user']}><Home/></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute allowedRoles={['user']}><ServicesPage/></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute allowedRoles={['user']}><Notifications/></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute allowedRoles={['user']}><History/></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute allowedRoles={['user', 'admin', 'agent']}><About/></ProtectedRoute>} />
        <Route path="/conditions" element={<ProtectedRoute allowedRoles={['user', 'admin', 'agent']}><Conditions/></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agent" element={<ProtectedRoute allowedRoles={['agent']}><AgentDashboard /></ProtectedRoute>} />
        <Route path="/archive" element={<ProtectedRoute allowedRoles={['agent', 'admin']}><ArchiveAgent /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes> 
    </BrowserRouter>
  </>
  );
}