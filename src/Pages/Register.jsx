import React, { useState } from "react";
import { AtSign, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useAppContext} from "../context/AppContext";
import axios from "axios";

export default function Register() {
  const { API_URL } = useAppContext();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    axios.post()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <img
            src="/logo-hopt.png"
            alt="Hopital Logo"
            className="w-20 mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">Créer un compte</h1>
          <p className="text-gray-500 text-sm">
            Inscrivez-vous pour accéder au système de file d'attente
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div className="relative">
            <User className="absolute top-3 left-3 text-gray-500 h-5 w-5" />
            <input
              type="text"
              name="fullName"
              required
              placeholder="Nom complet"
              value={form.fullName}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <AtSign className="absolute top-3 left-3 text-gray-500 h-5 w-5" />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-500 h-5 w-5" />
            <input
              type="password"
              name="password"
              required
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-500 h-5 w-5" />
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
          >
            S'inscrire
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Déjà un compte ?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-700 font-medium cursor-pointer hover:underline"
          >
            {" "}
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}
