import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Accueil", to: "/" },
        { name: "Portfolio", to: "/portfolio" },
        { name: "Services", to: "/services" },
         { name: "Contact", to: "/contact" },
       
    ];

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors uppercase tracking-widest ${
            isActive ? "text-white" : "text-white/60 hover:text-white"
        }`;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 px-6 py-4 ${isScrolled
                    ? "bg-black/60 backdrop-blur-md border-b border-white/10 py-3"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 text-white">
                    <Camera size={28} />
                    <span className="font-serif font-bold text-xl tracking-tighter uppercase">
                        Kambala Pictures
                    </span>
                </NavLink>

                {/* Desktop Menu en Blanc */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            end={link.to === "/"}
                            className={linkClass}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/reserver"
                        className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-brown hover:text-white transition-all"
                    >
                        Réserver
                    </NavLink>
                </div>

                {/* Mobile Toggle en Blanc */}
                <div className="md:hidden text-white">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Animé en mode Sombre */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                end={link.to === "/"}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `text-xl font-medium transition-colors ${
                                        isActive ? "text-white" : "text-white/80 hover:text-white"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <NavLink
                            to="/reserver"
                            onClick={() => setIsOpen(false)}
                            className="bg-white text-black w-full py-4 rounded-xl font-bold uppercase tracking-widest text-center block"
                        >
                            Réserver
                        </NavLink>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;