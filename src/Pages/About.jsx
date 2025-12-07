import Footer from "../Component/Footer";
import Footer1 from "../Component/Footer1";
import Header from "../Component/Header";

export default function About() {
  return (
    <>
    <Header />
    <div className="p-5 max-w-4xl mx-auto text-gray-800">

      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">
        À propos de notre système
      </h1>

      {/* Intro Card */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-6">
        <p className="leading-relaxed text-lg">
          Notre système de gestion de file d’attente hospitalière a été conçu pour 
          simplifier l’expérience des patients, réduire les temps d’attente, 
          améliorer la communication et optimiser l’organisation interne de l’hôpital.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-blue-700">Notre Mission</h2>
        <p className="leading-relaxed">
          Offrir un service fluide et moderne permettant aux patients de :
        </p>

        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
          <li>Prendre un ticket à distance</li>
          <li>Suivre leur position en temps réel</li>
          <li>Recevoir des notifications importantes</li>
          <li>Réduire les files d’attente physiques</li>
        </ul>
      </section>

      {/* Valeurs */}
      <section className="bg-white shadow-md rounded-xl p-5 mb-6">
        <h2 className="text-2xl font-semibold mb-3">Nos Valeurs</h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">•</span>
            Transparence dans l’attente et le suivi des services.
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">•</span>
            Accessibilité pour tous les patients.
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">•</span>
            Rapidité et optimisation du flux hospitalier.
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600 font-bold">•</span>
            Innovation pour améliorer le confort du patient.
          </li>
        </ul>
      </section>

      {/* Fonctionnement */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-blue-700">Comment ça fonctionne ?</h2>
        <p className="leading-relaxed">
          Le système repose sur un ensemble de modules qui travaillent ensemble :
        </p>

        <div className="mt-3 space-y-3">
          <div className="p-3 bg-white rounded-lg shadow-sm border">
            <strong className="text-blue-600">1. Prise de ticket :</strong>  
            Le patient choisit un service et remplit un petit formulaire.
          </div>

          <div className="p-3 bg-white rounded-lg shadow-sm border">
            <strong className="text-blue-600">2. Suivi en temps réel :</strong>  
            Le patient voit sa position et reçoit des alertes.
          </div>

          <div className="p-3 bg-white rounded-lg shadow-sm border">
            <strong className="text-blue-600">3. Appel du patient :</strong>  
            Une notification “Vous êtes bientôt appelé” l’informe.
          </div>

          <div className="p-3 bg-white rounded-lg shadow-sm border">
            <strong className="text-blue-600">4. Historique :</strong>  
            Le patient retrouve tous ses tickets et leurs statuts.
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white shadow-md rounded-xl p-5 mb-6">
        <h2 className="text-2xl font-semibold mb-3">Nous contacter</h2>
        <p className="leading-relaxed">
          Pour toute question, suggestion ou assistance, veuillez nous écrire :
        </p>

        <div className="mt-3 space-y-1">
          <p><strong>Email :</strong> support@hopital.bi</p>
          <p><strong>Téléphone :</strong> +257 61 00 00 00</p>
          <p><strong>Adresse :</strong> Bujumbura, Burundi</p>
        </div>
      </section>

      {/* Footer Info */}
      <p className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} Système de Gestion de File d’Attente – Tous droits réservés.
      </p>

    </div>
    <Footer />
    <Footer1 />
    </>
  );
}
