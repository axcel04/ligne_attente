// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAppContext from "../context/AppContext";
import { Users, Settings, LineChart, Archive, LogOut, Plus, Bell, Pencil, Trash2, XCircle, Menu,} from "lucide-react";



export default function AdminDashboard() {
 const { API_URL, DIR_URL } = useAppContext();
 const [activeSection, setActiveSection] = useState("Services");
 const [showSidebar, setShowSidebar] = useState(false);
 const [showAddServiceModal, setShowAddServiceModal] = useState(false);
 const [showAddAgentModal, setShowAddAgentModal] = useState(false);
 const [editData, setEditData] = useState(null);

 // load from localStorage if present, otherwise default
 const [services, setServices] = useState([]);
 useEffect(()=> {
  axios.get(`${API_URL}/service`)
    .then(resp => {
      setServices(resp.data)
    })
    .catch(err => console.log(err.message))
 },[])
 const [agents, setAgents] = useState(() => {
  try {
   const raw = localStorage.getItem("agents");
   return raw ? JSON.parse(raw) : [
    { id: 1, name: "Jean Paul", email: "jp@gmail.com", password: "123456", service: "Radiologie" },
    { id: 2, name: "Marie Claire", email: "mc@gmail.com", password: "azerty", service: "Laboratoire" },
   ];
  } catch {
   return [
    { id: 1, name: "Jean Paul", email: "jp@gmail.com", password: "123456", service: "Radiologie" },
    { id: 2, name: "Marie Claire", email: "mc@gmail.com", password: "azerty", service: "Laboratoire" },
   ];
  }
 });

 const [patients] = useState([
  { id: 1, name: "Patient Alpha", service: "Radiologie" },
  { id: 2, name: "Patient Bravo", service: "Radiologie" },
  { id: 3, name: "Patient Charlie", service: "Laboratoire" },
 ]);

 // persist services & agents to localStorage when they change
 useEffect(() => {
  localStorage.setItem("services", JSON.stringify(services));
 }, [services]);

 useEffect(() => {
  localStorage.setItem("agents", JSON.stringify(agents));
 }, [agents]);

 // Logout
 const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
 };

 // Ajouter/Modifier Service
 const handleSaveService = async (e) => {
  e.preventDefault();
  const f = new FormData(e.target);

  // Build FormData for multipart upload
  const formData = new FormData();
  formData.append("name", f.get("name"));
  formData.append("description", f.get("description"));

  // file (may be null)
  const file = f.get("image");
  if (file && file.size && file.name) {
   formData.append("image", file);
  }

  // optimistic id for local use
  const generatedId = editData ? editData.id : Date.now();

  // Try to send to backend
  try {
   const res = await axios.post(`${API_URL}/service`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
   });

   // Expect backend to return created service (containing image path like 'uploads/filename')
   const created = res.data;
   console.log("Created service from backend:", created);
   // Build accessible image URL if backend returns image path
   const imageUrl = created.image
    ? (API_URL ? `${API_URL.replace(/\/$/, "")}/${created.image}` : `/${created.image}`)
    : null;

   const newService = {
    id: created.id || generatedId,
    name: created.name,
    description: created.description,
    image: imageUrl || null,
   };

   setServices((prev) =>
    editData ? prev.map((s) => (s.id === editData.id ? newService : s)) : [newService, ...prev]
   );
  } catch (err) {
   // If backend fails (dev mode / offline), fallback to local-only behavior
   console.error("Upload failed, saving locally instead:", err?.message || err);

   const localImageUrl = file && file.size ? URL.createObjectURL(file) : editData?.image || null;
   const newService = {
    id: editData ? editData.id : generatedId,
    name: f.get("name"),
    description: f.get("description"),
    image: localImageUrl,
   };

   setServices((prev) =>
    editData ? prev.map((s) => (s.id === editData.id ? newService : s)) : [newService, ...prev]
   );
  } finally {
   setEditData(null);
   setShowAddServiceModal(false);
  }
 };

 const handleDeleteService = (id) => {
  setServices((prev) => prev.filter((s) => s.id !== id));
 };

 // Ajouter/Modifier Agent
 const handleSaveAgent = (e) => {
  e.preventDefault();
  const f = new FormData(e.target);

  const newAgent = {
   id: editData ? editData.id : Date.now(),
   name: f.get("name"),
   email: f.get("email"),
   password: f.get("password"),
   service: f.get("service"),
  };

  if (editData) setAgents((prev) => prev.map((a) => (a.id === editData.id ? newAgent : a)));
  else setAgents((prev) => [newAgent, ...prev]);

  setEditData(null);
  setShowAddAgentModal(false);
 };

 const handleDeleteAgent = (id) => {
  setAgents((prev) => prev.filter((a) => a.id !== id));
 };

 const patientsByService = services.map((s) => ({
  service: s.name,
  count: patients.filter((p) => p.service === s.name).length,
 }));

 return (
  <div className="flex bg-gray-100 min-h-screen overflow-hidden">
   {/* MENU MOBILE BUTTON */}
   <button
    className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 shadow-lg rounded-lg"
    onClick={() => setShowSidebar(true)}
   >
    <Menu className="h-6 w-6 text-blue-700" />
   </button>

   {/* SIDEBAR */}
   <aside
    className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl px-4 py-6 z-40 transition-transform duration-300
    ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
   >
    <h1 className="text-2xl font-bold text-blue-700 mb-10">Admin Panel</h1>

    <XCircle
     className="md:hidden absolute top-5 right-5 text-red-600 cursor-pointer"
     onClick={() => setShowSidebar(false)}
    />

    <ul className="space-y-4">
     {[{ label: "Services", icon: Settings },
      { label: "Agents", icon: Users },
      { label: "Rapports", icon: LineChart },
      { label: "Archives", icon: Archive },
     ].map((item) => (
      <li
       key={item.label}
       onClick={() => {
        setActiveSection(item.label);
        setShowSidebar(false);
       }}
       className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer font-semibold 
       ${activeSection === item.label ? "bg-blue-600 text-white" : "hover:bg-blue-50"}`}
      >
       <item.icon className="h-5 w-5" />
       {item.label}
      </li>
     ))}
    </ul>

    <button
     onClick={handleLogout}
     className="mt-12 flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
    >
     <LogOut className="h-5 w-5" /> Déconnexion
    </button>
   </aside>

   {/* MAIN */}
   <main className="flex-1 md:ml-64 p-6">
    {/* HEADER */}
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow-md px-6 flex items-center justify-between z-30">
     <h2 className="text-xl font-bold flex items-center gap-2">
      <Bell className="h-6 w-6 text-blue-600" />
      Dashboard — {activeSection}
     </h2>
    </header>

    <div className="mt-20 pb-10">
     {/* SERVICES SECTION */}
     {activeSection === "Services" && (
      <div className="bg-white p-6 rounded-xl shadow-md">
       <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Services</h3>
        <button
         onClick={() => { setEditData(null); setShowAddServiceModal(true); }}
         className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
         <Plus /> Ajouter
        </button>
       </div>

       {/* TABLE PC */}
       <table className="hidden md:table w-full mt-4">
        <thead>
         <tr className="bg-gray-50 text-gray-600">
          <th className="p-3">Image</th>
          <th className="p-3">Nom</th>
          <th className="p-3">Description</th>
          <th className="p-3">Actions</th>
         </tr>
        </thead>
        <tbody>
         {services.map((s) => (
          <tr key={s.id} className="border-b">
           <td className="p-3">
            {s.image ? <img src={`${DIR_URL}/${s.image}`} alt={s.name} className="h-12 w-12 object-cover rounded"/> : "—"}
           </td>
           <td className="p-3 font-semibold">{s.name}</td>
           <td className="p-3">{s.description}</td>
           <td className="p-3 flex gap-3">
            <Pencil className="text-blue-600 cursor-pointer"
             onClick={() => { setEditData(s); setShowAddServiceModal(true); }} />
            <Trash2 className="text-red-600 cursor-pointer"
             onClick={() => handleDeleteService(s.id)} />
           </td>
          </tr>
         ))}
        </tbody>
       </table>

       {/* CARDS MOBILE */}
       <div className="md:hidden grid gap-4 mt-4">
        {services.map((s) => (
         <div key={s.id} className="border p-4 rounded-lg shadow flex flex-col items-center">
          {s.image && <img src={s.image} alt={s.name} className="h-24 w-24 object-cover rounded mb-2"/>}
          <h4 className="font-bold text-lg">{s.name}</h4>
          <p className="text-gray-600">{s.description}</p>
          <div className="flex gap-6 mt-3">
           <Pencil className="text-blue-600 cursor-pointer"
            onClick={() => { setEditData(s); setShowAddServiceModal(true); }} />
           <Trash2 className="text-red-600 cursor-pointer"
            onClick={() => handleDeleteService(s.id)} />
          </div>
         </div>
        ))}
       </div>
      </div>
     )}

     {/* AGENTS SECTION */}
     {activeSection === "Agents" && (
      <div className="bg-white p-6 rounded-xl shadow-md">
       <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Agents</h3>
        <button
         onClick={() => { setEditData(null); setShowAddAgentModal(true); }}
         className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
         <Plus /> Ajouter
        </button>
       </div>

       <table className="hidden md:table w-full mt-4">
        <thead>
         <tr className="bg-gray-50 text-gray-600">
          <th className="p-3">Nom</th>
          <th className="p-3">Email</th>
          <th className="p-3">Password</th>
          <th className="p-3">Service</th>
          <th className="p-3">Actions</th>
         </tr>
        </thead>
        <tbody>
         {agents.map((a) => (
          <tr key={a.id} className="border-b">
           <td className="p-3 font-semibold">{a.name}</td>
           <td className="p-3">{a.email}</td>
           <td className="p-3">{a.password}</td>
           <td className="p-3">{a.service}</td>
           <td className="p-3 flex gap-3">
            <Pencil className="text-blue-600 cursor-pointer"
             onClick={() => { setEditData(a); setShowAddAgentModal(true); }} />
            <Trash2 className="text-red-600 cursor-pointer"
             onClick={() => handleDeleteAgent(a.id)} />
           </td>
          </tr>
         ))}
        </tbody>
       </table>

       <div className="md:hidden grid gap-4 mt-4">
        {agents.map((a) => (
         <div key={a.id} className="border p-4 rounded-lg shadow">
          <h4 className="font-bold text-lg">{a.name}</h4>
          <p className="text-gray-600">{a.email}</p>
          <p className="text-gray-600">{a.password}</p>
          <p className="text-gray-600">Service : {a.service}</p>
          <div className="flex gap-6 mt-3">
           <Pencil className="text-blue-600 cursor-pointer"
            onClick={() => { setEditData(a); setShowAddAgentModal(true); }} />
           <Trash2 className="text-red-600 cursor-pointer"
            onClick={() => handleDeleteAgent(a.id)} />
          </div>
         </div>
        ))}
       </div>
      </div>
     )}

     {/* RAPPORTS SECTION */}
     {activeSection === "Rapports" && (
      <div className="grid gap-6 md:grid-cols-3">
       {patientsByService.map((p) => (
        <div key={p.service} className="bg-white p-5 rounded-xl shadow">
         <h3 className="font-bold text-lg">{p.service}</h3>
         <p className="text-4xl font-extrabold text-blue-600 mt-3">{p.count}</p>
         <p className="text-gray-500 mt-1">Patients enregistrés</p>
        </div>
       ))}
      </div>
     )}
    </div>
   </main>

   {/* MODAL COMPONENT */}
   {showAddServiceModal && (
    <ModalService
     title={editData ? "Modifier Service" : "Ajouter un Service"}
     onClose={() => { setEditData(null); setShowAddServiceModal(false); }}
     onSubmit={handleSaveService}
     initial={editData}
    />
   )}

   {showAddAgentModal && (
    <Modal
     title={editData ? "Modifier Agent" : "Ajouter un Agent"}
     onClose={() => { setEditData(null); setShowAddAgentModal(false); }}
     onSubmit={handleSaveAgent}
     fields={[
      { label: "Nom complet", name: "name", default: editData?.name },
      { label: "Email", name: "email", default: editData?.email },
      { label: "Mot de passe", name: "password", default: editData?.password },
      { label: "Service", name: "service", type: "select", options: services.map((s) => s.name), default: editData?.service },
     ]}
    />
   )}
  </div>
 );
}

/* ---------------- Modal for Agents (generic) ---------------- */
function Modal({ title, onClose, onSubmit, fields }) {
 return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
   <form
    onSubmit={onSubmit}
    className="bg-white rounded-xl p-6 w-11/12 md:w-1/3 shadow-2xl"
   >
    <div className="flex justify-between items-center mb-4">
     <h3 className="text-xl font-bold">{title}</h3>
     <XCircle className="h-7 w-7 text-red-500 cursor-pointer" onClick={onClose} />
    </div>

    {fields.map((f) => (
     <div key={f.name} className="mb-4">
      <label className="block mb-1 font-semibold">{f.label}</label>

      {f.type === "select" ? (
       <select name={f.name} defaultValue={f.default} className="border p-2 rounded w-full">
        {f.options.map((o) => <option key={o}>{o}</option>)}
       </select>
      ) : f.textarea ? (
       <textarea name={f.name} defaultValue={f.default} className="border p-2 rounded w-full"></textarea>
      ) : (
       <input name={f.name} defaultValue={f.default} className="border p-2 rounded w-full" required />
      )}
     </div>
    ))}

    <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Enregistrer</button>
   </form>
  </div>
 );
}

/* ---------------- ModalService (with file input + preview) ---------------- */
function ModalService({ title, onClose, onSubmit, initial }) {
 const [preview, setPreview] = useState(initial?.image || null);
 const [selectedFile, setSelectedFile] = useState(null);

 useEffect(() => {
  // cleanup preview object URLs when component unmounts or file changes
  return () => {
   if (selectedFile && typeof preview === "string" && preview.startsWith("blob:")) {
    URL.revokeObjectURL(preview);
   }
  };
 }, [selectedFile, preview]);

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  setSelectedFile(file);
  if (file) {
   const url = URL.createObjectURL(file);
   setPreview(url);
  } else {
   setPreview(initial?.image || null);
  }
 };

 return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
   <form
    onSubmit={onSubmit}
    className="bg-white rounded-xl p-6 w-11/12 md:w-1/3 shadow-2xl"
    encType="multipart/form-data"
   >
    <div className="flex justify-between items-center mb-4">
     <h3 className="text-xl font-bold">{title}</h3>
     <XCircle className="h-7 w-7 text-red-500 cursor-pointer" onClick={onClose} />
    </div>

    <div className="mb-4">
     <label className="block mb-1 font-semibold">Nom du service</label>
     <input name="name" defaultValue={initial?.name} className="border p-2 rounded w-full" required />
    </div>

    <div className="mb-4">
     <label className="block mb-1 font-semibold">Description</label>
     <textarea name="description" defaultValue={initial?.description} className="border p-2 rounded w-full" />
    </div>

    <div className="mb-4">
     <label className="block mb-1 font-semibold">Image du service</label>
     <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="border p-2 rounded w-full" />
     {preview && (
      <div className="mt-3">
       <p className="text-sm text-gray-500 mb-2">Aperçu :</p>
       <img src={preview} alt="preview" className="h-32 w-32 object-cover rounded" />
      </div>
     )}
    </div>

    <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Enregistrer</button>
   </form>
  </div>
 );
}
