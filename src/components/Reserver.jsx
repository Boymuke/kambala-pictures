import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle, Award } from "lucide-react";

const reservation = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState("FORMAT A3 - 35US");

    const tarifs = [
        { id: "A5", label: "FORMAT A5", price: "15US" },
        { id: "A", label: "FORMAT A", price: "25US" },
        { id: "A3", label: "FORMAT A3", price: "35US" },
        { id: "A2", label: "FORMAT A2", price: "45US" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(form.current);
        const name = formData.get("user_name");
        const message = formData.get("message");
        const phoneNumber = "243999271177"; 

        const text = `*Réservation Officielle - Kambala Pictures*%0A%0A` +
                     `*Client:* ${name}%0A` +
                     `*Format Choisi:* ${selectedFormat}%0A` +
                     `*Message:* ${message}`;

        // Sur mobile, window.open dans une pause (setTimeout) est souvent bloqué
        // par sécurité. On affiche l'animation de succès et on redirige directement.
        setIsSubmitting(false);
        setIsSent(true);
        window.location.href = `https://wa.me/${phoneNumber}?text=${text}`;
    };

    return (
        <section className="bg-brand-dark py-32 px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                
                {/* --- EN-TÊTE --- */}
                <div className="text-center mb-16">
                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-brown uppercase tracking-[0.5em] text-[10px] font-bold mb-4">Tarification Officielle</motion.h2>
                    <h1 className="font-serif text-5xl md:text-7xl text-white italic tracking-tight">Nos <span className="text-brand-brown">Tarifs</span></h1>
                    <p className="text-zinc-500 mt-4 italic font-light text-sm">Sélectionnez votre format préféré ci-dessous.</p>
                </div>

                {/* --- SÉLECTEUR DE TARIFS --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                    {tarifs.map((t) => (
                        <motion.div 
                            key={t.id}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedFormat(`${t.label} - ${t.price}`)}
                            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-500 flex flex-col items-center justify-center gap-3 ${selectedFormat.includes(t.id) ? "border-brand-brown bg-brand-brown/10 scale-105" : "border-white/5 bg-zinc-900/50"}`}
                        >
                            <span className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase font-bold">{t.label}</span>
                            <div className="bg-white/5 px-4 py-1 rounded-full border border-white/10">
                                <span className="text-xl font-bold text-white tracking-widest">{t.price}</span>
                            </div>
                            {selectedFormat.includes(t.id) && <motion.div layoutId="check" className="text-brand-brown"><CheckCircle size={16} /></motion.div>}
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    
                    {/* --- COLONNE INFOS (Celle que tu as demandée) --- */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-white font-serif text-4xl italic mb-6 leading-tight">Prêt à capturer <br/> <span className="text-brand-brown">l'instant présent ?</span></h3>
                            <p className="text-zinc-500 leading-relaxed font-light max-w-sm">Chaque cliché raconte une histoire. Contactez-nous pour réserver votre créneau ou pour toute question spécifique.</p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-brown transition-colors">
                                    <Phone size={18} className="text-brand-brown" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Téléphone</p>
                                    <p className="text-white font-medium">+243 999 271 177</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-brown transition-colors">
                                    <Mail size={18} className="text-brand-brown" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Email</p>
                                    <p className="text-white font-medium">contact@kambalapictures.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-brown transition-colors">
                                    <MapPin size={18} className="text-brand-brown" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Studio</p>
                                    <p className="text-white font-medium">Limete, Kinshasa, RDC</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- FORMULAIRE --- */}
                    <motion.div className="bg-zinc-900/80 backdrop-blur-md p-8 md:p-10 rounded-sm border border-white/5 shadow-2xl relative">
                        {isSent ? (
                            <div className="text-center py-10">
                                <Award size={48} className="text-brand-brown mx-auto mb-4 animate-pulse" />
                                <h4 className="text-white font-serif text-2xl italic">Redirection WhatsApp...</h4>
                                <p className="text-zinc-500 mt-2 text-sm text-balance">Si la fenêtre ne s'ouvre pas, vérifiez vos bloqueurs de publicité.</p>
                                <button onClick={() => setIsSent(false)} className="mt-8 text-brand-brown text-[10px] uppercase tracking-widest border-b border-brand-brown">Modifier ma sélection</button>
                            </div>
                        ) : (
                            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">Nom Complet</label>
                                    <input required type="text" name="user_name" placeholder="Votre nom" className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-brand-brown transition-colors" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">Pack Sélectionné</label>
                                    <input readOnly value={selectedFormat} className="w-full bg-brand-brown/10 border border-brand-brown/20 rounded-sm p-4 text-brand-brown font-bold cursor-not-allowed outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">Votre Message</label>
                                    <textarea required name="message" rows="4" placeholder="Précisez la date et le lieu souhaités..." className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-brand-brown transition-colors resize-none"></textarea>
                                </div>

                                <button 
                                    disabled={isSubmitting}
                                    type="submit" 
                                    className="w-full bg-brand-brown text-white py-5 rounded-sm font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-700 shadow-xl shadow-brand-brown/20"
                                >
                                    {isSubmitting ? "Connexion..." : <>Réserver sur WhatsApp <Send size={14} /></>}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default reservation;