import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/home/Hero";
import PopularRoutes from "./components/home/PopularRoutes";
import WhyUniVah from "./components/home/WhyUniVah";
import HowItWorks from "./components/home/HowItWorks";
import SafetySection from "./components/home/SafetySection";
import CTA from "./components/home/CTA";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Profile from "./pages/Profile";
import FindRide from "./pages/FindRide";
import RideDetails from "./pages/RideDetails";
import OfferRide from "./pages/OfferRide";
import MyRides from "./pages/MyRides";
import ManageRide from "./pages/ManageRide";
import About from "./pages/About";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/find-ride" element={<FindRide />} />
            <Route path="/ride/:id" element={<RideDetails />} />
            <Route path="/offer-ride" element={<OfferRide />} />
            <Route path= "/my-rides" element={<MyRides />} />
            <Route path="/manage-ride/:id" element={<ManageRide />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
