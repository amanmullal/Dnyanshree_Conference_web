import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dnyanshree from "../assets/dnyanshree_logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navItems = [
    { name: "About", id: "about", type: "section" },
    { name: "Committee", id: "committee", type: "section" },
    { name: "Authors Guidelines", id: "authors", type: "section" },
    { name: "Program", id: "Program", type: "section" },
    { name: "Registration", id: "registration", type: "section" },
    { name: "Venue/Travel", id: "venue", type: "section" },
    { name: "Awards", id: "awards", type: "section" },
    { name: "Contact us", id: "contact", type: "section" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Only track sections if we're on the home page
      if (location.pathname === "/") {
        // Get all sections
        const sections = navItems
          .filter((item) => item.type === "section")
          .map((item) => document.getElementById(item.id))
          .filter(Boolean);
        const navbar = document.querySelector("nav");
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const scrollPosition = window.scrollY + navbarHeight + 100; // Add offset for better detection

        // Find the current active section
        let current = "";
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
     
          if (section && section.offsetTop <= scrollPosition) {
            current = section.id;
            break;
          }
        }

        // If we're at the very top of the page, don't highlight any section
        if (window.scrollY < 50) {
          current = "";
        }

        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems, location.pathname]);

  // Enhanced navigation function to handle cross-page section navigation
  const handleNavClick = (e, navItem) => {
    // If it's a route navigation, don't prevent default
    if (navItem.type === "route") {
      setIsOpen(false);
      return;
    }

    e.preventDefault();
    setIsOpen(false);

    // If we're not on the homepage, navigate to homepage first then scroll
    if (location.pathname !== "/") {
      // Navigate to homepage with section hash
      navigate(`/#${navItem.id}`);

      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const target = document.getElementById(navItem.id);
        if (target) {
          const navbar = document.querySelector("nav");
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition = target.offsetTop - navbarHeight - 10;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // We're already on homepage, just scroll to section
      setTimeout(() => {
        const target = document.getElementById(navItem.id);
        if (target) {
          const navbar = document.querySelector("nav");
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition = target.offsetTop - navbarHeight - 10;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  // Handle scrolling to section when coming from external page with hash
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.substring(1); // Remove the #
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          const navbar = document.querySelector("nav");
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition = target.offsetTop - navbarHeight - 10;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }, 500); // Longer delay to ensure page is fully loaded
    }
  }, [location.pathname, location.hash]);

  const isActiveItem = (item) => {

    if (item.type === "route") {
      return location.pathname === item.path;
    }
          
    // Only highlight section links when on homepage
    return location.pathname === "/" && activeSection === item.id;
  };
      console.log("fdfd", activeSection);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/75 backdrop-blur-lg shadow-xl border-b border-gray-200/30"
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center">
              <img
                src={dnyanshree}
                alt="Magnox Energy Solutions"
                className="h-12 w-auto"
              />
            </Link>
          </motion.div>

          {/* Hamburger Menu */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 transform origin-center ${
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
                isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 transform origin-center ${
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            />
          </motion.button>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex lg:items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.type === "route" ? (
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`relative transition-all duration-300 font-medium text-sm uppercase tracking-wide group cursor-pointer ${
                      isActiveItem(item)
                        ? "text-primary-600"
                        : "text-gray-700 hover:text-primary-600"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 origin-right ${
                        isActiveItem(item) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                ) : (
                  <motion.a
                    href={
                      location.pathname === "/" ? `#${item.id}` : `/#${item.id}`
                    }
                    onClick={(e) => handleNavClick(e, item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative transition-all duration-300 font-medium text-sm uppercase tracking-wide group cursor-pointer ${
                      isActiveItem(item)
                        ? "text-primary-600"
                        : "text-gray-700 hover:text-primary-600"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 origin-right ${
                        isActiveItem(item) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </motion.a>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div className="pt-2 glass-effect rounded-2xl mt-4">
                <ul className="flex flex-col space-y-1 p-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.type === "route" ? (
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-3 rounded-xl transition-all duration-200 font-medium cursor-pointer ${
                            isActiveItem(item)
                              ? "text-primary-600 bg-primary-50/70"
                              : "text-gray-700 hover:text-primary-600 hover:bg-primary-50/50"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <motion.a
                          href={
                            location.pathname === "/"
                              ? `#${item.id}`
                              : `/#${item.id}`
                          }
                          onClick={(e) => handleNavClick(e, item)}
                          whileHover={{ scale: 1.02, x: 10 }}
                          whileTap={{ scale: 0.98 }}
                          className={`block px-4 py-3 rounded-xl transition-all duration-200 font-medium cursor-pointer ${
                            isActiveItem(item)
                              ? "text-primary-600 bg-primary-50/70"
                              : "text-gray-700 hover:text-primary-600 hover:bg-primary-50/50"
                          }`}
                        >
                          {item.name}
                        </motion.a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
