import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";

// Component to conditionally render footer based on route
const ConditionalFooter = () => {
  const location = useLocation();

  // Don't show footer on services page
  if (location.pathname === "/services") {
    return null;
  }

  return <Footer />;
};

function App() {
  return (
    <Router basename="/Dnyanshree_Conference_web">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

export default App;
