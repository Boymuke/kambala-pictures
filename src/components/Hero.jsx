// src/components/Hero.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, Video, Brush } from "lucide-react";
import { useInView } from "react-intersection-observer";


// --- DONNÉES ---

const services = [
    {
        title: "Portrait d'Art",
        desc: "Des séances personnalisées pour capturer votre essence avec un regard éditorial.",
        icon: <Camera size={32} />,
    },
    {
        title: "Événementiel",
        desc: "Mariages et moments prestigieux immortalisés avec discrétion et élégance.",
        icon: <Video size={32} />,
    },
    {
        title: "Retouche Pro",
        desc: "Post-production avancée pour sublimer chaque détail de vos clichés.",
        icon: <Brush size={32} />,
    },
];



// --- COMPOSANTS INTERNES ---

const ServiceCard = ({ s, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <motion.div
            ref={ref}
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            className="p-10 border border-white/5 bg-white/[0.02] hover:border-brand-brown transition-all duration-500 group"
        >
            <div className="text-brand-brown mb-6 group-hover:scale-110 transition-transform duration-500">
                {s.icon}
            </div>
            <h4 className="text-white text-xl font-bold mb-4">{s.title}</h4>
            <p className="text-zinc-500 font-light leading-relaxed">{s.desc}</p>
        </motion.div>
    );
};

const Services = () => {
    const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.3 });
    return (
        <section id="services" className="py-24 bg-brand-dark px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-16"
                >
                    <h2 className="text-brand-brown uppercase tracking-[0.4em] text-xs font-bold mb-4">Mes Expertises</h2>
                    <h3 className="font-serif text-4xl md:text-5xl text-white">
                        Services <span className="italic font-normal opacity-60">Sur Mesure</span>
                    </h3>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((s, index) => (
                        <ServiceCard key={s.title} s={s} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};


const Testimonials = () => {
    const [reviewsList, setReviewsList] = useState([
        {
            name: "Sarah K.",
            role: "Mariée",
            text: "Kambala a su capturer l'émotion pure de notre mariage. Les photos sont au-delà de nos espérances.",
        },
        {
            name: "Jonathan M.",
            role: "Artiste",
            text: "Un regard unique à Kinshasa. Professionnalisme et créativité au rendez-vous.",
        },
    ]);
    const [newName, setNewName] = useState("");
    const [newText, setNewText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newName || !newText) return;
        const newReview = { name: newName, role: "Client", text: newText };
        setReviewsList([newReview, ...reviewsList]);
        setNewName("");
        setNewText("");
    };

    // On double la liste pour l'effet de défilement infini
    const duplicateReviews = [...reviewsList, ...reviewsList];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* En-tête */}
                <div className="text-center mb-16">
                    <h3 className="font-serif text-4xl text-brand-dark italic">Témoignages</h3>
                </div>

                {/* SLIDER INFINI */}
                <div className="relative flex overflow-hidden py-10">
                    <motion.div
                        className="flex gap-12 whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 30, // Plus le chiffre est grand, plus c'est lent
                            repeat: Infinity,
                        }}
                    >
                        {duplicateReviews.map((t, index) => (
                            <div
                                key={index}
                                className="inline-block w-[350px] md:w-[450px] bg-zinc-50 p-10 rounded-sm border border-zinc-100"
                            >
                                <p className="text-zinc-700 text-base italic leading-relaxed mb-6 whitespace-normal">
                                    "{t.text}"
                                </p>
                                <h5 className="font-bold text-brand-dark uppercase tracking-widest text-[10px]">
                                    {t.name}
                                </h5>
                                <span className="text-brand-brown text-[9px] uppercase mt-1 block tracking-[0.2em]">
                                    {t.role}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Formulaire de commentaire */}
                <div className="max-w-xl mx-auto border-t border-zinc-100 pt-20 mt-10">
                    <h4 className="text-center font-serif text-2xl mb-8">Partagez votre expérience</h4>
                    <form onSubmit={handleSubmit} className="space-y-4 px-6">
                        <input
                            type="text"
                            placeholder="Votre Nom"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full border-b border-zinc-300 py-3 focus:border-brand-brown outline-none transition-colors text-sm font-light"
                        />
                        <textarea
                            placeholder="Votre message..."
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            rows="2"
                            className="w-full border-b border-zinc-300 py-3 focus:border-brand-brown outline-none transition-colors text-sm font-light resize-none"
                        ></textarea>
                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                className="bg-brand-dark text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-brand-brown transition-all duration-500"
                            >
                                Publier l'avis
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

// --- COMPOSANT PRINCIPAL HERO ---

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.4, ease: "easeOut" },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
    const heroImage = "https://res.cloudinary.com/dcem1jiw9/image/upload/v1774392187/WhatsApp_Image_2026-02-01_at_13.19.03_sv2afy.jpg";
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const rotateYParallax = useTransform(scrollYProgress, [0, 1], ["0deg", "12deg"]);
    const opacityScroll = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <>
            <section
                ref={heroRef}
                className="relative min-h-screen w-full bg-brand-dark flex items-center pt-32 pb-12 overflow-hidden"
            >
                <div className="max-w-7xl mx-auto w-full px-6 flex flex-col-reverse md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* PHOTO */}
                    <div style={{ perspective: "1200px" }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ y: yParallax, rotateY: rotateYParallax, opacity: opacityScroll }}
                            className="relative group aspect-[3/4] w-full overflow-hidden rounded-sm shadow-2xl cursor-crosshair"
                        >
                            <motion.img
                                src={heroImage}
                                alt="Kambala Pictures Hero"
                                className="h-full w-full object-cover origin-center grayscale-0 transition-all duration-700 group-hover:grayscale group-hover:contrast-125"
                                whileHover={{ scale: 1.08 }}
                            />
                            <div className="absolute inset-0 bg-brand-dark/10 transition-opacity duration-500 group-hover:bg-brand-dark/40 group-hover:backdrop-blur-[2px]" />
                            <div className="absolute inset-8 border-brand-light/20 transition-all duration-700 group-hover:inset-4 group-hover:border-brand-brown">
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-inherit" />
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-inherit" />
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-inherit" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-inherit" />
                            </div>
                        </motion.div>
                    </div>

                    {/* ÉCRITS */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col items-start text-left"
                    >
                        <motion.span variants={itemVariants} className="text-xs font-bold uppercase tracking-[0.6em] text-brand-brown mb-6">
                            Kambala Pictures
                        </motion.span>
                        <motion.h1 variants={itemVariants} className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-brand-light leading-[1.1] mb-8">
                            Capturer l'essence <br />
                            <span className="italic font-normal text-brand-light/80">de chaque instant.</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-md mb-10 font-light">
                            Basé à Kinshasa, Kambala Pictures crée des portraits intemporels qui racontent votre histoire avec une esthétique brute et sophistiquée.
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <a
                                href="#portfolio"
                                className="group relative inline-flex items-center gap-5 border border-brand-light/20 px-8 md:px-12 py-5 md:py-6 text-xs font-bold uppercase tracking-[0.3em] text-brand-light hover:bg-brand-light hover:text-brand-dark transition-all duration-700"
                            >
                                Découvrir la Galerie
                                <div className="w-8 h-[1px] bg-brand-light group-hover:bg-brand-dark transition-all duration-500" />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Services />
            <Testimonials />
        </>
    );
};

export default Hero;