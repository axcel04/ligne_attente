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
export default function App() {
  return (
  // < Header />
  <BrowserRouter>
    {/* <Header /> */}
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/servicesPage" element={<ServicesPage />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/history" element={<History />} />
      <Route path="/about" element={<About />} />
      <Route path="/conditions" element={<Conditions />} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="agentDashboard" element={<AgentDashboard />} />
      <Route path="archiveAgent" element={<ArchiveAgent />} />
      <Route path="adminDashboard" element={<AdminDashboard />} />
    </Routes> 
    {/* <Footer />
    <Footer1 /> */}
  </BrowserRouter>
  );
}