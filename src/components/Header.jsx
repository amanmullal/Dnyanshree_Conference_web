import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroVideo from "../assets/dnyanshree_college.jpg";
import introBg from "../assets/bg-img.png";

export const Header = (props) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Floating particles animation
  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <header className="relative pt-20 overflow-hidden">
      {/* Optimized Video Background */}

      <div className="absolute inset-0">
        <img
          src={heroVideo}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Gradient overlay to match original design */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-800/40 to-blue-600/60"></div>

        {/* Additional overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      {/* Fallback background (for when video doesn't load) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-blue-600 animate-gradient-shift bg-[length:400%_400%] -z-10">
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      {/* Floating particles - keeping original animation */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            variants={particleVariants}
            animate="animate"
            className="absolute w-2 h-2 bg-white/30 rounded-full will-change-transform"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes - keeping original design */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-white/20 rotate-45 animate-pulse-slow z-10 will-change-transform"></div>
      <div className="absolute bottom-1/3 right-16 w-24 h-24 border border-white/30 rounded-full animate-float z-10 will-change-transform"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rotate-12 animate-bounce-slow z-10 will-change-transform"></div>

      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center z-20">
        <motion.div
          className="container-custom text-center text-white z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl mb-8 leading-relaxed max-w-4xl mx-auto font-bold"
          >
            {props.data ? props.data.section : "Loading..."}
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-6xl font-bold mb-2 leading-tight will-change-transform"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="block">
                {props.data ? (
                  props.data.title.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-4 will-change-transform"
                      initial={{ opacity: 0, rotateX: 90 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                    >
                      {word}
                    </motion.span>
                  ))
                ) : (
                  <span className="animate-pulse">Loading...</span>
                )}
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto font-light"
            >
              {props.data ? props.data.date : "Loading..."}
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto font-light"
          >
            {props.data ? props.data.organisedBy : "Loading..."}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl  leading-relaxed max-w-4xl mx-auto font-light"
          >
            {props.data ? props.data.paragraph : "Loading..."}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl mb-8 leading-relaxed max-w-4xl mx-auto font-light"
          >
            {props.data ? props.data.collegeName : "Loading..."}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="#features"
              className="btn-primary group will-change-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <motion.div
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300 will-change-transform"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.a>

            <motion.a
              href="#about"
              className="btn-secondary will-change-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          {/* <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer will-change-transform"
            >
              <span className="text-sm mb-2 font-medium">
                Scroll to explore
              </span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div> */}
        </motion.div>
      </div>
    </header>
  );
};
