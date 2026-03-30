import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import YouTube from "react-youtube";
import { VolumeX, ChevronLeft, ChevronRight, X, Download } from "lucide-react";

// --- FONCTION DE TÉLÉCHARGEMENT ---
const downloadImage = async (url, filename) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename || 'kambala-pictures-capture.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Erreur de téléchargement:", error);
    }
};

// --- COMPOSANT PHOTO ANIMÉE ---
const AnimatedPhoto = ({ photo, index, onZoom }) => {
    const ref = useRef(null);
    const [refInView, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? ["0px", "40px"] : ["0px", "-40px"]);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    return (
        <div style={{ perspective: "1000px" }} ref={refInView} className="mb-8 break-inside-avoid relative">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: (index % 12) * 0.05 }}
                style={{ y: yParallax, rotateX: rotate.x, rotateY: rotate.y, transition: "rotate 0.1s" }}
                onMouseMove={(e) => {
                    const rect = ref.current.getBoundingClientRect();
                    setRotate({ x: -(e.clientY - rect.top - rect.height / 2) / 25, y: (e.clientX - rect.left - rect.width / 2) / 25 });
                }}
                onMouseLeave={() => setRotate({ x: 0, y: 0 })}
                onClick={() => onZoom(index)}
                className="relative group cursor-zoom-in overflow-hidden rounded-sm shadow-2xl border border-white/5 bg-zinc-900"
            >
                <img src={photo.url} alt={photo.title} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-white font-serif italic text-lg">{photo.title}</p>
                            <p className="text-brand-brown text-[10px] uppercase tracking-widest mt-1">Kambala Pictures</p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); downloadImage(photo.url, `Kambala_${photo.id}.jpg`); }}
                            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-brand-brown transition-colors"
                            title="Télécharger"
                        >
                            <Download size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- COMPOSANT MUSIQUE ---
const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const videoId = "UtQpSGyPCBE";
    const opts = { height: '0', width: '0', playerVars: { autoplay: 0, loop: 1, playlist: videoId, controls: 0 } };

    return (
        <div className="fixed bottom-10 left-10 z-[110]">
            <div className="hidden pointer-events-none">
                <YouTube videoId={videoId} opts={opts} onReady={(e) => { setPlayer(e.target); e.target.setVolume(25); }} />
            </div>
            <button onClick={() => { isPlaying ? player.pauseVideo() : player.playVideo(); setIsPlaying(!isPlaying); }} className="group flex items-center gap-3 bg-black/80 backdrop-blur-2xl border border-white/10 p-4 rounded-full hover:bg-brand-brown transition-all duration-700 shadow-2xl">
                <div className="relative w-5 h-5 flex items-center justify-center">
                    {isPlaying ? <div className="flex gap-[3px] items-end h-3"><div className="w-[2px] bg-brand-brown animate-[music-bar_0.8s_infinite]"></div><div className="w-[2px] bg-white animate-[music-bar_1.2s_infinite]"></div><div className="w-[2px] bg-brand-brown animate-[music-bar_0.9s_infinite]"></div></div> : <VolumeX size={18} className="text-zinc-500" />}
                </div>
                <div className="overflow-hidden max-w-0 group-hover:max-w-[150px] transition-all duration-700"><span className="text-[9px] text-white uppercase tracking-[0.4em] whitespace-nowrap pl-2 pr-1 font-medium">{isPlaying ? "Ambiance On" : "Activer le son"}</span></div>
            </button>
            <style>{`@keyframes music-bar { 0%, 100% { height: 4px; } 50% { height: 14px; } }`}</style>
        </div>
    );
};

// --- COMPOSANT PRINCIPAL ---
const Gallery = () => {
    const [allPhotos, setAllPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const photosPerPage = 40; 

    const cloudName = "dcem1jiw9";
    const tag = "Gallerie Kambala";

    useEffect(() => {
        // Récupération automatique de tes 66 photos
        fetch(`https://res.cloudinary.com/${cloudName}/image/list/${encodeURIComponent(tag)}.json`)
            .then((res) => res.json())
            .then((data) => {
                const formattedPhotos = data.resources.map((res, i) => ({
                    id: i,
                    // Utilisation de q_auto et f_auto pour que ça charge vite à Kinshasa
                    url: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${res.public_id}.${res.format}`,
                    title: `Capture Kambala n°${i + 1}`
                }));
                setAllPhotos(formattedPhotos);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur de chargement Cloudinary:", err);
                setLoading(false);
            });
    }, []);

    const totalPages = Math.ceil(allPhotos.length / photosPerPage);
    const currentPhotos = allPhotos.slice((currentPage - 1) * photosPerPage, currentPage * photosPerPage);

    const showNext = useCallback((e) => { e?.stopPropagation(); setActiveIndex((prev) => (prev !== null && prev < currentPhotos.length - 1 ? prev + 1 : prev)); }, [currentPhotos.length]);
    const showPrev = useCallback((e) => { e?.stopPropagation(); setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev)); }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activeIndex === null) return;
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "Escape") setActiveIndex(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex, showNext, showPrev]);

    if (loading) {
        return (
            <div className="bg-brand-dark min-h-screen flex items-center justify-center">
                <div className="text-white font-serif italic text-xl animate-pulse">Chargement de la galerie...</div>
            </div>
        );
    }

    return (
        <section className="bg-brand-dark min-h-screen pt-40 pb-20 px-6 overflow-hidden text-white">
            <div className="max-w-[1600px] mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-32 text-center">
                    <h2 className="text-brand-brown uppercase tracking-[0.5em] text-[10px] font-bold mb-5">Kambala Collection</h2>
                    <h1 className="font-serif text-5xl md:text-8xl text-white italic mb-6 tracking-tight">Le <span className="text-brand-brown">Regard</span> Kambala</h1>
                    <div className="h-[1px] w-24 bg-brand-brown mx-auto mb-10 opacity-60"></div>
                    <p className="text-zinc-500 max-w-2xl mx-auto font-light italic text-lg leading-relaxed">"Transformez vos photos en l'élégance du vintage avec Kambala pictures."</p>
                </motion.div>

                <div>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentPage} 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            transition={{ duration: 0.5 }}
                            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8 min-h-[70vh]"
                        >
                            {currentPhotos.map((photo, index) => (
                                <AnimatedPhoto key={photo.id} photo={photo} index={index} onZoom={setActiveIndex} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex flex-col items-center mt-24 gap-8 border-t border-white/5 pt-12">
                    <div className="flex gap-4">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button key={i} onClick={() => { setCurrentPage(i + 1); setActiveIndex(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className={`w-12 h-12 rounded-full transition-all duration-500 text-[10px] font-bold border ${currentPage === i + 1 ? "bg-brand-brown border-brand-brown text-white scale-110 shadow-lg shadow-brand-brown/20" : "border-white/10 text-zinc-500 hover:border-white/40"}`}>{i + 1}</button>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setActiveIndex(null)}
                        className="fixed inset-0 z-[150] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4"
                    >
                        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[160]">
                            <div className="text-white/40 text-[10px] tracking-widest uppercase">Kambala High Definition View</div>
                            <div className="flex gap-6">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); downloadImage(currentPhotos[activeIndex].url, `Kambala_HD_${activeIndex}.jpg`); }}
                                    className="flex items-center gap-2 text-white/60 hover:text-brand-brown transition-colors text-[10px] font-bold uppercase tracking-widest"
                                >
                                    <Download size={18} /> Télécharger HD
                                </button>
                                <button onClick={() => setActiveIndex(null)} className="text-white/50 hover:text-white transition-colors"><X size={28} /></button>
                            </div>
                        </div>

                        {activeIndex > 0 && (
                            <button onClick={showPrev} className="absolute left-4 md:left-10 p-4 text-white/20 hover:text-brand-brown transition-all z-[160]"><ChevronLeft size={48} strokeWidth={1} /></button>
                        )}
                        {activeIndex < currentPhotos.length - 1 && (
                            <button onClick={showNext} className="absolute right-4 md:right-10 p-4 text-white/20 hover:text-brand-brown transition-all z-[160]"><ChevronRight size={48} strokeWidth={1} /></button>
                        )}

                        <motion.div 
                            key={activeIndex}
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <img src={currentPhotos[activeIndex].url} className="max-w-full max-h-[75vh] object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5" />
                            <p className="text-white font-serif italic mt-8 text-2xl tracking-tight">{currentPhotos[activeIndex].title}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <MusicPlayer />
        </section>
    );
};

export default Gallery;