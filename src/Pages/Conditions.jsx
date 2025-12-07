import React from "react";
import Header from "../Component/Header";
import Footer1 from "../Component/Footer1";
import Footer from "../Component/Footer";

export default function Conditions() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Conditions d’Utilisation
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">

          {/* 1. Objet du service */}
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              1. Objet du Service
            </h2>
            <p>
              Le système de gestion de file d’attente en ligne permet aux patients 
              de prendre un ticket, de suivre leur position en temps réel et 
              d’être notifiés avant leur passage au guichet ou au service médical.
            </p>
          </section>

          {/* 2. Acceptation */}
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              2. Acceptation des Conditions
            </h2>
            <p>
              En utilisant ce service, vous acceptez les présentes conditions 
              d’utilisation. Si vous n’êtes pas d’accord, vous êtes invité à ne 
              pas utiliser cette plateforme.
            </p>
          </section>

          {/* 3. Obligations de l’utilisateur */}
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              3. Obligations de l’Utilisateur
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Fournir des informations exactes lors de la prise de ticket.</li>
              <li>Respecter les appels et se présenter au service au moment indiqué.</li>
              <li>Ne pas utiliser la plateforme de manière abusive ou frauduleuse.</li>
            </ul>
          </section>

          {/* 4. Protection des données */}
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              4. Protection des Données
            </h2>
            <p>
              Les informations personnelles collectées (nom, contact, ticket, 
              service) sont strictement utilisées pour la gestion de la file 
              d’attente et ne sont jamais partagées avec des tiers, sauf 
              obligation légale.
            </p>
          </section>

          {/* 5. Responsabilité */}
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              5. Limitation de Responsabilité
            </h2>
            <p>
              L’hôpital ne peut être tenu responsable en cas de mauvaise connexion 
              Internet, d'attente prolongée ou d’impossibilité de notifier un 
              patient pour cause de numéro invalide ou inatteignable.
            </p>
          </section>

          {/* 6. Modification du service */}
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              6. Modification du Service
            </h2>
            <p>
              L’hôpital se réserve le droit de modifier, suspendre ou améliorer 
              le système de gestion de file d’attente sans préavis pour assurer 
              un meilleur fonctionnement.
            </p>
          </section>

          {/* 7. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              7. Contact
            </h2>
            <p>
              Pour toute question relative à ces conditions, veuillez contacter 
              le service d’assistance de l’hôpital.
            </p>
          </section>

        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          © 2025 – Hôpital National de Bujumbura
        </p>
      </div>
    </div>
    <Footer />
    <Footer1 />
    </>
  );
}
