import Header from "./Component/Header";
// import Footer from "./Component/Footer";
// import Footer1 from "./Component/Footer1";
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


export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/history" element={<History />} />
      <Route path="/about" element={<About />} />
      <Route path="/conditions" element={<Conditions />} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="agent" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} />
      <Route path="archive" element={<ProtectedRoute><ArchiveAgent /></ProtectedRoute>} />
      <Route path="admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    </Routes> 
  </BrowserRouter>
  );
}