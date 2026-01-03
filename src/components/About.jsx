import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, ArrowRight } from "lucide-react";
import bgImage from "../assets/dnyanshree_college2.png";
import pride from "../assets/dnyanshree_pride.jpg";

export const About = (props) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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

  const leftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Background overlay for better content readability */}
        <div className="absolute inset-0 bg-white/90"></div>
        {/* Gradient overlay to match design */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85"></div>
      </div>

      {/* Background decorations - keeping original but with enhanced visibility */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-l from-primary-200/60 to-transparent rounded-full blur-2xl z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-r from-accent-200/50 to-transparent rounded-full blur-3xl z-10"></div>

      <div className="container-custom relative z-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Image Section */}

          <div className="flex flex-col  gap-20">
            <motion.div className="relative " variants={leftVariants}>
              <div className="relative">
                {/* Main image */}
                <motion.div
                  className="relative overflow-hidden rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={bgImage}
                    className="w-full h-auto object-cover"
                    alt="About Magnox Energy Solutions"
                  />
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 to-transparent"></div>
                </motion.div>

                {/* Floating card */}
                <motion.div
                  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      NAAC
                    </div>
                    <div className="text-sm text-gray-600">
                      Accredited Institute
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-xl"></div>
              </div>
            </motion.div>
            <motion.div className="relative" variants={leftVariants}>
              <div className="relative">
                {/* Main image */}
                <motion.div
                  className="relative overflow-hidden rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={pride}
                    className="w-full h-auto object-cover"
                    alt="About Magnox Energy Solutions"
                  />
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 to-transparent"></div>
                </motion.div>

                {/* Floating card */}
                <motion.div
                  className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      12+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-xl"></div>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <motion.div className="space-y-8" variants={rightVariants}>
            <div>
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <span className="gradient-text">About Us</span>
              </motion.h2>

              <motion.p
                className="text-xl text-gray-600 leading-relaxed mb-8 text-justify"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {props.data ? props.data.paragraph : "Loading our story..."}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                Conference Objectives
                <ArrowRight className="ml-3 w-8 h-8 text-primary-500" />
              </h3>

              <motion.div
                variants={listVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {props.data?.Why ? (
                  props.data.Why.map((item, index) => (
                    <motion.div
                      key={`why-${index}`}
                      variants={itemVariants}
                      className="flex items-start space-x-3 mb-4 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-6 h-6 text-primary-500 mt-0.5 group-hover:text-accent-500 transition-colors duration-300" />
                      <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        {item}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <div className="animate-pulse text-gray-500">
                    Loading benefits...
                  </div>
                )}
              </motion.div>

              {/* Right column */}
              {/* <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {props.data?.Why2 ? (
                    props.data.Why2.map((item, index) => (
                      <motion.div
                        key={`why2-${index}`}
                        variants={itemVariants}
                        className="flex items-start space-x-3 mb-4 group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="w-6 h-6 text-accent-500 mt-0.5 group-hover:text-primary-500 transition-colors duration-300" />
                        <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {item}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <div className="animate-pulse text-gray-500">
                      Loading more benefits...
                    </div>
                  )}
                </motion.div> */}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.a
                href="#services"
                className="btn-primary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Services
                <motion.div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
