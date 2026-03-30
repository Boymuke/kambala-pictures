import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Image as ImageIcon, Phone } from "lucide-react";

const servicesList = [
  {
    title: "Format A5",
    price: "15$",
    description: "Le format intime, idéal pour vos bureaux ou vos tables de chevet. Une touche d'élégance discrète.",
    // Remplace "ID_DE_TA_PHOTO_A5" par le vrai nom (public_id) de ta photo dans Cloudinary
    image: "https://res.cloudinary.com/dcem1jiw9/image/upload/q_auto,f_auto,c_fill,w_800,h_1000/WhatsApp_Image_2026-03-24_at_18.57.02_kdh4fh.jpg", 
    features: ["Impression Haute Définition", "Papier d'art premium", "Parfait pour les petits cadeaux"],
  },
  {
    title: "Format A4",
    price: "25$",
    description: "Le standard de l'élégance. Idéal pour créer des galeries murales composées de plusieurs souvenirs.",
    // Remplace par l'ID de la photo A4
    image: "https://res.cloudinary.com/dcem1jiw9/image/upload/q_auto,f_auto,c_fill,w_800,h_1000/WhatsApp_Image_2026-03-24_at_18.57.02_52_brmh2g.jpg",
    features: ["Format standard salon", "Papier d'art premium", "Encadrement sur mesure inclus"],
  },
  {
    title: "Format A3",
    price: "35$",
    description: "Pour ceux qui veulent marquer les esprits. Une taille généreuse qui capture chaque détail de l'émotion.",
    // Remplace par l'ID de la photo A3
    image: "https://res.cloudinary.com/dcem1jiw9/image/upload/q_auto,f_auto,c_fill,w_800,h_1000/WhatsApp_Image_2026-03-24_at_18.57.02_36_rxotyp.jpg",
    features: ["Finition Mat ou Brillant", "Papier d'art premium", "Impact visuel garanti"],
  },
  {
    title: "Format A2",
    price: "45$",
    description: "L'expérience galerie chez vous. La pièce maîtresse pour transformer votre mur en une véritable exposition.",
    // Remplace par l'ID de la photo A2
    image: "https://res.cloudinary.com/dcem1jiw9/image/upload/q_auto,f_auto,c_fill,w_800,h_1000/WhatsApp_Image_2026-02-01_at_13.12.36_jp7fj5.jpg",
    features: ["Impression Extra-Large", "Encadrement haut de gamme", "Traitement UV longue durée"],
  }
];

const Services = () => {
  return (
    <div className="bg-brand-dark min-h-screen pt-32 pb-20 px-6 font-light">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-brown uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
          >
            Art & Impression
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-white italic mb-6"
          >
            Nos <span className="text-brand-brown">Formats</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Chaque impression est une pièce unique, réalisée sur du papier d'art sélectionné pour sa texture et sa durabilité.
          </motion.p>
        </div>

        {/* Liste des Formats */}
        <div className="space-y-32">
          {servicesList.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* Côté Image Visuelle */}
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] bg-zinc-900 overflow-hidden relative border border-white/5 shadow-2xl">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 transition-opacity duration-700 group-hover:bg-transparent" />
                </div>
                {/* Décoration ligne */}
                <div className="absolute top-8 -left-4 md:-left-8 w-8 h-[1px] bg-brand-brown" />
                <div className="absolute bottom-8 -right-4 md:-right-8 w-8 h-[1px] bg-brand-brown" />
              </div>

              {/* Côté Texte */}
              <div className="w-full md:w-1/2 space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-6">
                    <h2 className="text-3xl md:text-5xl font-serif text-white italic">{service.title}</h2>
                    <span className="text-2xl md:text-4xl text-brand-brown font-serif italic">{service.price}</span>
                  </div>
                  <p className="text-zinc-400 text-lg leading-relaxed">{service.description}</p>
                </div>

                <ul className="space-y-4 pt-4 border-t border-white/10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-zinc-300 text-sm italic">
                      <ImageIcon size={14} className="text-brand-brown mt-1 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <a 
                    href={`https://wa.me/243999271177?text=Bonjour Kambala Pictures, je souhaite commander une impression au format ${service.title}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white group hover:text-brand-brown transition-colors"
                  >
                    Commander ce format
                    <div className="w-8 h-[1px] bg-white group-hover:bg-brand-brown group-hover:w-12 transition-all duration-500" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer de la page */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 text-center border border-white/5 bg-white/[0.01] p-16 md:p-24 backdrop-blur-sm"
        >
          <div className="flex justify-center mb-8">
            <Phone size={32} className="text-brand-brown animate-pulse" />
          </div>
          <h3 className="font-serif text-3xl md:text-5xl text-white italic mb-6">Format sur-mesure ?</h3>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto mb-10 font-light">
            Besoin d'un format spécifique ou d'un encadrement particulier ? Nous créons des pièces uniques adaptées à vos espaces.
          </p>
          <a 
            href="https://wa.me/243999271177"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-4 bg-brand-brown px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all duration-700 shadow-2xl shadow-brand-brown/20"
          >
            Nous contacter <ArrowRight size={16} />
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default Services;