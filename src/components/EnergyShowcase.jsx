import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Package,
  Award,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react";
import data from "../data/data.json";

// Import portfolio images from assets
import portfolio01 from "../assets/images/portfolio/01-large.jpg";
import portfolio02 from "../assets/images/portfolio/02-large.jpg";
import portfolio03 from "../assets/images/portfolio/03-large.jpg";
import portfolio04 from "../assets/images/portfolio/04-large.jpg";
import portfolio05 from "../assets/images/portfolio/05-large.jpg";
import portfolio06 from "../assets/images/portfolio/06-large.jpg";

// Import energy solution images
import solarImage from "../assets/images/energy-solutions/Solar.png";
import windImage from "../assets/images/energy-solutions/Wind.jpg";
import hydroImage from "../assets/images/energy-solutions/Hydro.jpeg";
import biogasImage from "../assets/images/energy-solutions/Biogas.png";
import miningImage from "../assets/images/energy-solutions/Mining.jpeg";

const EnergyShowcase = () => {
  const [activeAccordion, setActiveAccordion] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const toggleAccordion = (solutionId, section) => {
    setActiveAccordion((prev) => ({
      ...prev,
      [`${solutionId}-${section}`]: !prev[`${solutionId}-${section}`],
    }));
  };

  // Image mapping for portfolio and energy solution images
  const imageMap = {
    "01-large.jpg": portfolio01,
    "02-large.jpg": portfolio02,
    "03-large.jpg": portfolio03,
    "04-large.jpg": portfolio04,
    "05-large.jpg": portfolio05,
    "06-large.jpg": portfolio06,
    "/src/assets/images/energy-solutions/Solar.png": solarImage,
    "/src/assets/images/energy-solutions/Wind.jpg": windImage,
    "/src/assets/images/energy-solutions/Hydro.jpeg": hydroImage,
    "/src/assets/images/energy-solutions/Biogas.png": biogasImage,
    "/src/assets/images/energy-solutions/Mining.jpeg": miningImage,
  };

  // Get energySolutions from data.json
  const energySolutions = data.EnergySolutions.map((solution) => ({
    ...solution,
    image: imageMap[solution.image] || solution.image,
  }));

  const accordionSections = [
    {
      key: "products",
      title: "Products & Services",
      icon: Package,
      color: "text-blue-600",
    },
    {
      key: "specifications",
      title: "Technical Specifications",
      icon: Zap,
      color: "text-green-600",
    },
    {
      key: "caseStudies",
      title: "Success Stories",
      icon: Award,
      color: "text-purple-600",
    },
  ];

  // Helper function to convert gradient classes to solid colors
  const getSolidColor = (gradientClass) => {
    const colorMap = {
      "from-orange-500 to-yellow-500": "bg-orange-500",
      "from-blue-500 to-cyan-500": "bg-blue-500",
      "from-teal-500 to-blue-600": "bg-teal-500",
      "from-green-500 to-emerald-500": "bg-green-500",
      "from-gray-600 to-slate-700": "bg-gray-600",
    };
    return colorMap[gradientClass] || "bg-gray-500";
  };

  return (
    <section className="py-8 ">
      <div className="w-full mx-auto">
        {/* Energy Solutions Grid */}
        <div className="space-y-4">
          {energySolutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20">
                <div
                  className={`flex flex-col lg:flex-row ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Section */}
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <div className="aspect-[2/1] lg:aspect-auto lg:h-full relative">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                      ></div>
                    </div>

                    {/* Bold Solid Partition/Divider */}
                    <div
                      className={`absolute ${
                        index % 2 === 1 ? "left-0" : "right-0"
                      } top-0 h-full w-2 ${getSolidColor(
                        solution.color
                      )} opacity-90 shadow-md hidden lg:block`}
                    ></div>
                  </div>

                  {/* Solid Vertical Divider for Mobile */}
                  <div className="relative lg:hidden">
                    <div
                      className={`h-1 w-full ${getSolidColor(
                        solution.color
                      )} opacity-80`}
                    ></div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center relative">
                    {/* Content Border */}
                    <div
                      className={`absolute ${
                        index % 2 === 1 ? "right-0" : "left-0"
                      } top-0 h-full w-1 ${getSolidColor(
                        solution.color
                      )} opacity-30 hidden lg:block`}
                    ></div>

                    <div className="mb-6 relative z-10">
                      <div
                        className={`inline-flex items-center gap-3 ${solution.bgColor} px-4 py-2 rounded-full text-sm font-semibold text-gray-800 mb-4 shadow-md`}
                      >
                        <span
                          className={`w-3 h-3 ${getSolidColor(
                            solution.color
                          )} rounded-full shadow-sm`}
                        ></span>
                        Solution #{solution.id}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {solution.title}
                      </h3>

                      <p className="text-base text-gray-600 font-medium mb-2">
                        {solution.subtitle}
                      </p>

                      {/* Content Divider Line */}
                      <div className="relative mb-6">
                        <div
                          className={`h-1 w-24 ${getSolidColor(
                            solution.color
                          )} rounded-full shadow-sm`}
                        ></div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-0 text-sm">
                        {solution.description}
                      </p>
                    </div>

                    {/* Modern Accordion Sections */}
                    <div className="space-y-3 mb-6 relative z-10">
                      {accordionSections.map((section) => {
                        const isOpen =
                          activeAccordion[`${solution.id}-${section.key}`];
                        const IconComponent = section.icon;

                        return (
                          <div
                            key={section.key}
                            className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 overflow-hidden"
                          >
                            <motion.button
                              onClick={() =>
                                toggleAccordion(solution.id, section.key)
                              }
                              className="w-full px-4 py-1 flex items-center justify-between hover:bg-white/80 transition-all duration-300 group"
                              whileHover={{ x: 2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg bg-gray-50 ${section.color} group-hover:bg-white transition-colors`}
                                >
                                  <IconComponent size={16} />
                                </div>
                                <span className="font-semibold text-gray-800 text-sm">
                                  {section.title}
                                </span>
                              </div>

                              <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="text-gray-500 group-hover:text-gray-700"
                              >
                                <ChevronDown size={18} />
                              </motion.div>
                            </motion.button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 bg-gradient-to-br from-white/40 to-gray-50/40">
                                    <div className="space-y-2">
                                      {solution[section.key]?.map(
                                        (item, idx) => (
                                          <motion.div
                                            key={idx}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{
                                              delay: idx * 0.05,
                                              duration: 0.3,
                                            }}
                                            className="flex items-start gap-3 p-1 bg-white/70 rounded-lg border border-white/60 hover:bg-white/90 transition-colors group"
                                          >
                                            <div
                                              className={`w-1.5 h-1.5 bg-gradient-to-r ${solution.color} rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform`}
                                            ></div>
                                            <span className="text-gray-700 text-xs leading-relaxed font-medium">
                                              {item}
                                            </span>
                                          </motion.div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    {/* Key Benefits - Enhanced Design */}
                    <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/60 backdrop-blur-sm rounded-xl p-4 mb-2 relative z-10 border border-green-200/40">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                        <div className="p-1.5 bg-green-100 rounded-lg">
                          <CheckCircle size={14} className="text-green-600" />
                        </div>
                        Key Benefits
                      </h4>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        {solution.benefits}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-20 h-20 bg-red-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Transform Your Energy Future?
              </h3>
              <p className="text-gray-300 mb-4 max-w-xl mx-auto text-sm">
                Get expert assistance and tailored solutions for your renewable
                energy needs
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.button
                  className="btn-primary group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // If we're not on the homepage, navigate to homepage first then scroll
                    if (location.pathname !== "/") {
                      // Navigate to homepage with contact section hash
                      navigate("/#contact");

                      // Wait for navigation to complete, then scroll
                      setTimeout(() => {
                        const target = document.getElementById("contact");
                        if (target) {
                          const navbar = document.querySelector("nav");
                          const navbarHeight = navbar
                            ? navbar.offsetHeight
                            : 80;
                          const targetPosition =
                            target.offsetTop - navbarHeight - 10;

                          window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth",
                          });
                        }
                      }, 100);
                    } else {
                      // We're already on homepage, just scroll to contact section
                      setTimeout(() => {
                        const target = document.getElementById("contact");
                        if (target) {
                          const navbar = document.querySelector("nav");
                          const navbarHeight = navbar
                            ? navbar.offsetHeight
                            : 80;
                          const targetPosition =
                            target.offsetTop - navbarHeight - 10;

                          window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth",
                          });
                        }
                      }, 100);
                    }
                  }}
                >
                  Contact Us Today
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnergyShowcase;
