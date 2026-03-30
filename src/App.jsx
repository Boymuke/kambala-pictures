import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Reserver from "./components/Reserver";
import Services from "./components/Services";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="bg-brand-dark min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/portfolio" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reserver" element={<Reserver />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;