import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Linkedin, Mail, Users } from "lucide-react";

// Import team images
import team01 from "../assets/images/team/01.jpg";
import team02 from "../assets/images/team/02.jpg";
import team03 from "../assets/images/team/03.jpg";
import team04 from "../assets/images/team/04.jpg";

export const Team = (props) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Map team images
  const teamImages = [team01, team02, team03, team04];

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
    hidden: { opacity: 0, y: 60, rotateY: 30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="team"
      className="section-padding bg-white relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="container-custom relative">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center items-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-12 h-12 text-primary-500 mr-4" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              Committee Members
            </h2>
          </motion.div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The talented individuals behind our success - passionate
            professionals dedicated to excellence
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div className="flex flex-col gap-5">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {props.data ? (
              props.data.Chief_Patron.map((member, index) => {
                const teamImage = teamImages[index] || teamImages[0]; // Fallback to first image

                return (
                  <motion.div
                    key={`${member.name}-${index}`}
                    variants={itemVariants}
                    whileHover={{ y: -15 }}
                    className="group"
                  >
                    <div className="relative bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden">
                      {/* Image container */}
                      <div className="relative overflow-hidden">
                        {/* <motion.img
                        src={teamImage}
                        alt={member.name}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      /> */}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Social icons - appear on hover */}
                        <motion.div
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={{ y: 20 }}
                          whileHover={{ y: 0 }}
                        >
                          <motion.a
                            href={member.linkedin}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          >
                            <Linkedin className="w-5 h-5" />
                          </motion.a>
                          <motion.a
                            href="#"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          >
                            <Mail className="w-5 h-5" />
                          </motion.a>
                        </motion.div>

                        {/* Professional badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Team Member
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 text-center relative">
                        <div class="border-b-2 border-gray">
                          <p className="text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
                            {member.job}
                          </p>
                        </div>
                        <motion.h3
                          className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300 mt-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          {member.name}
                        </motion.h3>
                        <p className="text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
                          {member.description}
                        </p>

                        {/* Skill level indicator */}
                        {/* <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-primary-200"
                              animate={
                                inView
                                  ? {
                                      backgroundColor:
                                        i < 4 ? "#6366f1" : "#e5e7eb",
                                      scale: [1, 1.2, 1],
                                    }
                                  : {}
                              }
                              transition={{
                                delay: 0.5 + index * 0.2 + i * 0.1,
                                duration: 0.3,
                              }}
                            />
                          ))}
                        </div>
                      </div> */}

                        {/* Decorative line */}
                        <div className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto group-hover:w-16 transition-all duration-500 rounded-full"></div>
                      </div>

                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center">
                <div className="animate-pulse text-gray-500 text-xl">
                  Loading our amazing team...
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {props.data ? (
              props.data.Patron.map((member, index) => {
                const teamImage = teamImages[index] || teamImages[0]; // Fallback to first image

                return (
                  <motion.div
                    key={`${member.name}-${index}`}
                    variants={itemVariants}
                    whileHover={{ y: -15 }}
                    className="group"
                  >
                    <div className="relative bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden">
                      {/* Image container */}
                      <div className="relative overflow-hidden">
                        {/* <motion.img
                        src={teamImage}
                        alt={member.name}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      /> */}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Social icons - appear on hover */}
                        <motion.div
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={{ y: 20 }}
                          whileHover={{ y: 0 }}
                        >
                          <motion.a
                            href={member.linkedin}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          >
                            <Linkedin className="w-5 h-5" />
                          </motion.a>
                          <motion.a
                            href="#"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          >
                            <Mail className="w-5 h-5" />
                          </motion.a>
                        </motion.div>

                        {/* Professional badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Team Member
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 text-center relative">
                        <div class="border-b-2 border-gray">
                          <p className="text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
                            {member.job}
                          </p>
                        </div>
                        <motion.h3
                          className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300 mt-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          {member.name}
                        </motion.h3>
                        <p className="text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
                          {member.description}
                        </p>

                        {/* Skill level indicator */}
                        {/* <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-primary-200"
                              animate={
                                inView
                                  ? {
                                      backgroundColor:
                                        i < 4 ? "#6366f1" : "#e5e7eb",
                                      scale: [1, 1.2, 1],
                                    }
                                  : {}
                              }
                              transition={{
                                delay: 0.5 + index * 0.2 + i * 0.1,
                                duration: 0.3,
                              }}
                            />
                          ))}
                        </div>
                      </div> */}

                        {/* Decorative line */}
                        <div className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto group-hover:w-16 transition-all duration-500 rounded-full"></div>
                      </div>

                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center">
                <div className="animate-pulse text-gray-500 text-xl">
                  Loading our amazing team...
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {props.data ? (
              props.data.Convenors.map((member, index) => {
                const teamImage = teamImages[index] || teamImages[0]; // Fallback to first image

                return (
                  <motion.div
                    key={`${member.name}-${index}`}
                    variants={itemVariants}
                    whileHover={{ y: -15 }}
                    className="group"
                  >
                    <div className="relative bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden">
                      {/* Image container */}
                      <div className="relative overflow-hidden">
                        {/* <motion.img
                        src={teamImage}
                        alt={member.name}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      /> */}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Social icons - appear on hover */}
                        <motion.div
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={{ y: 20 }}
                          whileHover={{ y: 0 }}
                        >
                          <motion.a
                            href={member.linkedin}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          >
                            <Linkedin className="w-5 h-5" />
                          </motion.a>
                          <motion.a
                            href="#"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          >
                            <Mail className="w-5 h-5" />
                          </motion.a>
                        </motion.div>

                        {/* Professional badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Team Member
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 text-center relative">
                        <div class="border-b-2 border-gray">
                          <p className="text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
                            {member.job}
                          </p>
                        </div>
                        <motion.h3
                          className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300 mt-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          {member.name}
                        </motion.h3>
                        <p className="text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
                          {member.description}
                        </p>

                        {/* Skill level indicator */}
                        {/* <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-primary-200"
                              animate={
                                inView
                                  ? {
                                      backgroundColor:
                                        i < 4 ? "#6366f1" : "#e5e7eb",
                                      scale: [1, 1.2, 1],
                                    }
                                  : {}
                              }
                              transition={{
                                delay: 0.5 + index * 0.2 + i * 0.1,
                                duration: 0.3,
                              }}
                            />
                          ))}
                        </div>
                      </div> */}

                        {/* Decorative line */}
                        <div className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto group-hover:w-16 transition-all duration-500 rounded-full"></div>
                      </div>

                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center">
                <div className="animate-pulse text-gray-500 text-xl">
                  Loading our amazing team...
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {props.data ? (
              props.data.Coordinators.map((member, index) => {
                const teamImage = teamImages[index] || teamImages[0]; // Fallback to first image

                return (
                  <motion.div
                    key={`${member.name}-${index}`}
                    variants={itemVariants}
                    whileHover={{ y: -15 }}
                    className="group"
                  >
                    <div className="relative bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden">
                      {/* Image container */}
                      <div className="relative overflow-hidden">
                        {/* <motion.img
                        src={teamImage}
                        alt={member.name}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      /> */}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Social icons - appear on hover */}
                        <motion.div
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={{ y: 20 }}
                          whileHover={{ y: 0 }}
                        >
                          <motion.a
                            href={member.linkedin}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          >
                            <Linkedin className="w-5 h-5" />
                          </motion.a>
                          <motion.a
                            href="#"
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                          >
                            <Mail className="w-5 h-5" />
                          </motion.a>
                        </motion.div>

                        {/* Professional badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Team Member
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 text-center relative">
                        <div class="border-b-2 border-gray">
                          <p className="text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
                            {member.job}
                          </p>
                        </div>
                        <motion.h3
                          className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300 mt-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          {member.name}
                        </motion.h3>
                        <p className="text-primary-500 font-semibold mb-4 uppercase tracking-wide text-sm">
                          {member.description}
                        </p>

                        {/* Skill level indicator */}
                        {/* <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-primary-200"
                              animate={
                                inView
                                  ? {
                                      backgroundColor:
                                        i < 4 ? "#6366f1" : "#e5e7eb",
                                      scale: [1, 1.2, 1],
                                    }
                                  : {}
                              }
                              transition={{
                                delay: 0.5 + index * 0.2 + i * 0.1,
                                duration: 0.3,
                              }}
                            />
                          ))}
                        </div>
                      </div> */}

                        {/* Decorative line */}
                        <div className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto group-hover:w-16 transition-all duration-500 rounded-full"></div>
                      </div>

                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-accent-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center">
                <div className="animate-pulse text-gray-500 text-xl">
                  Loading our amazing team...
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom stats section */}
        {/* <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {[
            { number: "50+", label: "Projects Completed", icon: "🚀" },
            { number: "5+", label: "Years Experience", icon: "⭐" },
            { number: "100%", label: "Client Satisfaction", icon: "❤️" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch With Us
            <motion.span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
