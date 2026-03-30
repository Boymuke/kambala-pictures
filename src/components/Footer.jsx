// src/components/Footer.jsx

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-dark pt-20 pb-10 px-6 border-t border-white/5 font-light">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

                    {/* Logo & Bio Rapide */}
                    <div className="max-w-sm">
                        <h2 className="font-serif text-2xl text-white mb-4 italic tracking-tight">
                            Kambala Pictures
                        </h2>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            Photographie d'art et de portrait basée à Kinshasa.
                            Capturer l'invisible, immortaliser l'instant.
                        </p>
                    </div>

                    {/* Contact Rapide */}
                    <div className="flex flex-col gap-2">
                        <span className="text-brand-brown uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
                            Contact
                        </span>
                        <a href="mailto:contact@kambalapictures.com" className="text-zinc-400 hover:text-white transition-colors text-sm">
                            contact@kambalapictures.com
                        </a>
                        <span className="text-zinc-500 text-sm">Kinshasa, Limete</span>
                    </div>

                    {/* Social - Liens Textuels */}
                    <div className="flex flex-col gap-2">
                        <span className="text-brand-brown uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
                            Suivre
                        </span>
                        <a href="https://www.instagram.com/kambala___pictures?igsh=MXVmcDc5MHkzMmo0ZQ==" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm">
                            Instagram
                        </a>
                        <a href="https://wa.me/243999271177" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors text-sm">
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-zinc-600 uppercase tracking-[0.4em]">
                    <p>© {currentYear} Kambala Pictures — Droits Réservés</p>
                    <p className="opacity-50">Réalisé avec soin par BMK Coding</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;