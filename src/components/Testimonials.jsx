import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, Star } from "lucide-react";

// Import testimonial images
import testimonial01 from "../assets/images/testimonials/01.jpg";
import testimonial02 from "../assets/images/testimonials/02.jpg";
import testimonial03 from "../assets/images/testimonials/03.jpg";
import testimonial04 from "../assets/images/testimonials/04.jpg";
import testimonial05 from "../assets/images/testimonials/05.jpg";
import testimonial06 from "../assets/images/testimonials/06.jpg";

// Create image mapping
const testimonialImages = {
  "01.jpg": testimonial01,
  "02.jpg": testimonial02,
  "03.jpg": testimonial03,
  "04.jpg": testimonial04,
  "05.jpg": testimonial05,
  "06.jpg": testimonial06,
};

export const Testimonials = (props) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      id="testimonials"
      className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-100/20 rounded-full blur-3xl"></div>

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
            <span className="gradient-text">What Our Clients Say</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {props.data ? (
            props.data.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="group h-full"
              >
                <div className="card-modern h-full relative overflow-hidden">
                  {/* Quote icon background */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Quote className="w-16 h-16 text-primary-500" />
                  </div>

                  {/* Card content */}
                  <div className="relative">
                    {/* Stars rating */}
                    <div className="flex justify-center mb-6">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              delay: 0.5 + index * 0.2 + i * 0.1,
                              type: "spring",
                              stiffness: 500,
                            }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Client photo */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gradient-to-r from-primary-500 to-accent-500 shadow-lg">
                          <img
                            src={
                              testimonialImages[testimonial.img] ||
                              testimonial.img
                            }
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Animated ring */}
                        <motion.div
                          className="absolute inset-0 w-20 h-20 border-2 border-primary-300/50 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Testimonial text */}
                    <motion.p
                      className="text-gray-600 italic leading-relaxed mb-6 text-center relative"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.2 }}
                    >
                      <span className="text-primary-500 text-2xl font-bold">
                        "
                      </span>
                      {testimonial.text.replace(/"/g, "")}
                      <span className="text-primary-500 text-2xl font-bold">
                        "
                      </span>
                    </motion.p>

                    {/* Client name */}
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.2 }}
                    >
                      <div className="font-bold text-gray-800 text-lg group-hover:text-primary-600 transition-colors duration-300">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Verified Client
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full group-hover:w-16 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <div className="animate-pulse text-gray-500 text-xl">
                Loading testimonials...
              </div>
            </div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.a
            href="#team"
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Meet Our Team
            <motion.span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
