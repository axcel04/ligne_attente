import React, { useState } from "react";
import { AtSign, Lock, Shield, UserCheck, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // user | agent | admin
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    localStorage.setItem("authRole", role);
    localStorage.setItem("authUser", JSON.stringify(form));

    if (role === "user") navigate("/home");
    if (role === "agent") navigate("/agentDashboard");
    if (role === "admin") navigate("/adminDashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mx-auto mt-4 mb-10">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <img
            src="/logo-hopt.png"
            alt="Logo"
            className="w-20 mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">Connexion</h1>
          <p className="text-gray-500 text-sm">
            Accédez au système de file d’attente de l'Hôpital
          </p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setRole("user")}
            className={`py-2 rounded-lg border flex items-center justify-center gap-2 
              ${
                role === "user"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            <UserCheck className="h-5 w-5" />
            <span className="text-sm font-medium">Patient</span>
          </button>

          <button
            onClick={() => setRole("agent")}
            className={`py-2 rounded-lg border flex items-center justify-center gap-2 
              ${
                role === "agent"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            <UserCog className="h-5 w-5" />
            <span className="text-sm font-medium">Agent</span>
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`py-2 rounded-lg border flex items-center justify-center gap-2 
              ${
                role === "admin"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">Admin</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <AtSign className="absolute top-3 left-3 text-gray-500 h-5 w-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-500 h-5 w-5" />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
          >
            Se connecter
          </button>
        </form>

        {/* Link to Register */}
        <p className="text-center mt-4 text-sm text-gray-600 pb-4">
          Pas encore de compte ?
          <span
            onClick={() => navigate("/")}
            className="text-blue-700 font-medium cursor-pointer hover:underline"
          >
            {" "}
            Créer un compte
          </span>
        </p>
      </div>
    </div>
  );
}
