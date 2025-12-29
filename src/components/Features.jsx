import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Zap,
  Building2,
  MapPin,
  Factory,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Features = (props) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const Features = [
    {
      icon: "fa fa-comments-o",
      title: "Civil and Environmental Engineering",
      text: `1. Smart Infrastructure Development: Applications of IoT for Sustainable Civil Engineering
2. Green Energy Solutions for Sustainable Construction and Infrastructure
3. Innovative Waste Management Strategies for Sustainable Urban Development
4. AI/Machine Learning Applications for Sustainable Civil Engineering Practices
5. Integrating Sustainable Development Goals (SDGs) into Civil Engineering Design and Practice`,
    },
    {
      icon: "fa fa-bullhorn",
      title: "Computer Science and Engineering",
      text: `1. AI and Machine Learning for Driving Sustainable Development and Innovation
2. Ethical Hacking for Strengthening Digital Security and Sustainable Cyber Ecosystems
3. Data Science for Informed Decision-Making and Sustainable Resource Management
4. Advancing Cybersecurity for Resilient and Sustainable Digital Infrastructure
5. Blockchain Technology for Transparency, Trust, and Sustainable Digital Transformation
6. Exploring the Limitations of Artificial Intelligence in Achieving Sustainable Development Goals`,
    },
    {
      icon: "fa fa-group",
      title: "Mechanical and Mechatronics Engineering",
      text: `1. Sustainable Industrial Automation for Smart Manufacturing and Resource Efficiency
2. Robotics for Sustainable Production and Industrial Innovation
3. Advances in Metallurgy and Nanotechnology for Sustainable Materials Development
4. AI and Machine Learning Applications for Intelligent and Sustainable Mechatronic Systems
5. Additive Manufacturing Technologies for Sustainable Design and Production`,
    },
    {
      icon: "fa fa-magic",
      title: "Electrical Engineering",
      text: `1. Innovations in Renewable and Sustainable Energy Technologies for a Greener Future
2. Smart and Resilient Power Systems for Sustainable Energy Management
3. AI and Machine Learning Applications for Intelligent Electrical Systems
4. Advanced Control Engineering for Energy Efficiency and Sustainable Automation
5. Integrating Electrical Engineering Innovations to Achieve Sustainable Development Goals`,
    },
    {
      icon: "fa fa-magic",
      title: "Electronics and Telecommunication Engineering",
      text: `1. VLSI, Embedded and IoT Technologies for Energy-Efficient and Sustainable Electronic Systems
2. Next-Generation Communication Systems for Inclusive and Sustainable Connectivity
3. Sustainable Computer Networking and Smart Connectivity Solutions
4. Digital Signal and Image Processing for Smart and Sustainable Applications
5. AI and Machine Learning Applications in Biomedical Engineering for Sustainable Healthcare
6. Innovations in Antenna Design and Wave Propagation for Sustainable Communication Networks`,
    },
    {
      icon: "fa fa-magic",
      title: "Science",
      text: `1. Sustainable Materials Science and Nanotechnology for Green Innovations
2. Molecular and Optical Physics for Renewable Energy and Advanced Sensing
3. Quantum Materials for Sustainable Energy and Smart Technologies
4. Energy, Environment, and Climate-Responsive Technologies
5. Physical Chemistry for Sustainable Processes and Green Solutions
6. Biomolecular Science and Green Biotechnology for Sustainable Health and Environment
7. Environmental Physics and Chemistry for Climate Resilience
8. Interdisciplinary Approaches in Bio-Nanoscience for Sustainable Development`,
    },
  ];


  // Dynamic icon mapping based on feature content
  const iconMap = {
    0: Zap, // Energy/Power related features
    1: Building2, // Infrastructure/Building related features
    2: MapPin, // Right-of-Way Expertise - represents location/land permissions
    3: Factory, // Utility-Scale Projects - represents large-scale industrial projects
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="features"
      className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container-custom relative">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <span className="gradient-text">Conferance Topics</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Innovate the key research areas and emerging technologies
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {props.data ? (
            Features.map((feature, index) => {
              const IconComponent = iconMap[index] || Factory;

              return (
                <motion.div
                  key={`${feature.title}-${index}`}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="group"
                >
                  <div className="card-modern text-center h-full relative overflow-hidden">
                    {/* Card background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon */}
                    <motion.div
                      className="relative mb-6 flex justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                          <IconComponent className="w-10 h-10" />
                        </div>
                        {/* Pulse ring */}
                        <div className="absolute inset-0 w-20 h-20 bg-primary-500/20 rounded-2xl animate-ping group-hover:animate-none"></div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line text-left">
                        {feature.text}
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary-200/50 to-accent-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-accent-200/40 to-primary-200/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full flex justify-center">
              <div className="animate-pulse text-gray-500 text-xl">
                Loading Conferance Topics...
              </div>
            </div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.a
            href="#about"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
