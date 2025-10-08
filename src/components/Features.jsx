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
            <span className="gradient-text">Amazing Features</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the powerful features that make our platform stand out from
            the rest
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {props.data ? (
            props.data.map((feature, index) => {
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
                      <p className="text-gray-600 leading-relaxed">
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
                Loading amazing features...
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
