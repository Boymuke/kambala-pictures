import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
// Les icônes de marques (Instagram, Linkedin) ont été retirées de lucide-react. 
// Je les ajoute ci-dessous en tant que composants SVG personnalisés.
import { Send, MessageSquare, Clock, Mail } from "lucide-react";

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGeneralContact = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(form.current);
    const name = formData.get("user_name");
    const subject = formData.get("subject");
    const message = formData.get("message");
    
    const phoneNumber = "243999271177";
    const text = `*Demande d'information - Kambala Pictures*%0A%0A` +
                 `*Nom:* ${name}%0A` +
                 `*Objet:* ${subject}%0A` +
                 `*Message:* ${message}`;

    // Sur mobile, window.open dans une pause (setTimeout) est souvent bloqué
    // par sécurité. On affiche l'animation de succès et on redirige directement.
    setIsSubmitting(false);
    window.location.href = `https://wa.me/${phoneNumber}?text=${text}`;
  };

  return (
    <div className="bg-brand-dark min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête minimaliste */}
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl md:text-8xl text-white italic mb-6"
          >
            Contact<span className="text-brand-brown">.</span>
          </motion.h1>
          <p className="text-zinc-500 text-lg font-light max-w-xl">
            Une question ? Un projet spécifique à Kinshasa ou ailleurs ? 
            Parlons-en autour d'un café ou via ce formulaire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Infos de gauche */}
          <div className="space-y-12">
            <div>
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2">
                <MessageSquare size={14} className="text-brand-brown" /> Disponibilité
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed italic">
                Réponse sous 12h maximum.<br />
                Du Lundi au Samedi : 09h — 19h
              </p>
            </div>

            <div>
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/kambala___pictures/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:border-brand-brown hover:text-brand-brown transition-all">
                  <Instagram size={18} />
                </a>
               
              </div>
            </div>
          </div>

          {/* Formulaire de contact général */}
          <div className="lg:col-span-2">
            <form ref={form} onSubmit={handleGeneralContact} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-b border-white/10 focus-within:border-brand-brown transition-colors py-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-2">Votre Nom</label>
                  <input required name="user_name" type="text" placeholder="Exaucé Muke" className="bg-transparent w-full text-white outline-none placeholder:text-zinc-800" />
                </div>
                <div className="border-b border-white/10 focus-within:border-brand-brown transition-colors py-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-2">Objet</label>
                  <input required name="subject" type="text" placeholder="Partenariat, Événement..." className="bg-transparent w-full text-white outline-none placeholder:text-zinc-800" />
                </div>
              </div>

              <div className="border-b border-white/10 focus-within:border-brand-brown transition-colors py-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-2">Message</label>
                <textarea required name="message" rows="4" placeholder="Comment puis-je vous aider ?" className="bg-transparent w-full text-white outline-none placeholder:text-zinc-800 resize-none" />
              </div>

              <button 
                disabled={isSubmitting}
                className="flex items-center gap-4 text-white group"
              >
                <span className="w-12 h-12 rounded-full border border-brand-brown flex items-center justify-center group-hover:bg-brand-brown transition-all duration-500">
                  <Send size={16} className={isSubmitting ? "animate-ping" : ""} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-brand-brown transition-colors">
                  {isSubmitting ? "Envoi..." : "Envoyer le message"}
                </span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;