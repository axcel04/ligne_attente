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
import Unauthorized from "./Component/UnAuthorized";


export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<ProtectedRoute allowedRoles={['user']}><Home/></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute allowedRoles={['user']}><ServicesPage/></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute allowedRoles={['user']}><Notifications/></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute allowedRoles={['user']}><History/></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute allowedRoles={['user', 'admin', 'agent']}><History/></ProtectedRoute>} />
      <Route path="/conditions" element={<ProtectedRoute allowedRoles={['user', 'admin', 'agent']}><Conditions/></ProtectedRoute>} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="agent" element={<ProtectedRoute allowedRoles={['agent']}><AgentDashboard /></ProtectedRoute>} />
      <Route path="archive" element={<ProtectedRoute allowedRoles={['agent', 'admin']}><ArchiveAgent /></ProtectedRoute>} />
      <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/unauthorized" element={<Unauthorized/>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes> 
  </BrowserRouter>
  );
}