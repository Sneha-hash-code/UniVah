import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import PopularRoutes from "./components/home/PopularRoutes";
import WhyUniVah from "./components/home/WhyUniVah";
import HowItWorks from "./components/home/HowItWorks";
import SafetySection from "./components/home/SafetySection";
import CTA from "./components/home/CTA";

function Home() {
  return (
    <main>
      <Hero />
      <PopularRoutes />
      <WhyUniVah />
      <HowItWorks />
      <SafetySection />
      <CTA />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;