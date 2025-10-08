import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Youtube,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { emailConfig } from "../config/emailConfig";
import Map from "./Map";

const XIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const initialState = {
  name: "",
  email: "",
  mobile: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, mobile, message }, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("Sending email via EmailJS...");

      const templateParams = {
        name: name,
        email: email,
        mobile: mobile,
        message: message,
        reply_to: email,
        to_name: "Magnox Energy Team",
      };

      // Single email send - EmailJS template handles both recipients via BCC
      const result = await emailjs.send(
        emailConfig.serviceID,
        emailConfig.templateID,
        templateParams,
        emailConfig.publicKey
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");
      clearState();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Email submission failed:", error);

      // Handle specific EmailJS errors
      if (error.text?.includes("insufficient authentication scopes")) {
        console.error("Gmail authentication issue - need to re-authorize");
      }

      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div>
      <section
        id="contact"
        className="section-padding bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white relative overflow-hidden"
        ref={ref}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Get{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                In Touch
              </span>
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Ready to start your project? Let's discuss how we can help bring
              your vision to life
            </p>
          </motion.div>

          {/* Status Messages */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`max-w-md mx-auto mb-8 p-4 rounded-2xl flex items-center space-x-3 ${
                submitStatus === "success"
                  ? "bg-green-500/20 border border-green-400/30 text-green-100"
                  : submitStatus === "partial"
                  ? "bg-yellow-500/20 border border-yellow-400/30 text-yellow-100"
                  : "bg-red-500/20 border border-red-400/30 text-red-100"
              }`}
            >
              {submitStatus === "success" ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : submitStatus === "partial" ? (
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-400" />
              )}
              <span className="font-medium">
                {submitStatus === "success"
                  ? "Message sent successfully to both recipients! We'll get back to you soon."
                  : submitStatus === "partial"
                  ? "Message partially sent (one recipient received it). Please try again or contact us directly."
                  : "Failed to send message. Please try again or contact us directly."}
              </span>
            </motion.div>
          )}

          {/* Main Content */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-3xl p-8 border-white/10">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-white placeholder-blue-200"
                        placeholder="Your Name"
                        required
                        onChange={handleChange}
                        value={name}
                        disabled={isSubmitting}
                      />
                    </motion.div>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-white placeholder-blue-200"
                        placeholder="Your Email"
                        required
                        onChange={handleChange}
                        value={email}
                        disabled={isSubmitting}
                      />
                    </motion.div>
                  </div>

                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-white placeholder-blue-200"
                      placeholder="Your Mobile Number"
                      required
                      onChange={handleChange}
                      value={mobile}
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                    <textarea
                      name="message"
                      id="message"
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-white placeholder-blue-200 resize-none"
                      rows="6"
                      placeholder="Send us a message..."
                      required
                      onChange={handleChange}
                      value={message}
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-effect rounded-3xl p-8 border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      label: "Address",
                      value: props.data?.address || "Loading address...",
                      color: "text-blue-300",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: props.data?.phone || "Loading phone...",
                      color: "text-purple-300",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: props.data?.email || "Loading email...",
                      color: "text-blue-300",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`${item.color} mt-1`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {item.label}
                        </p>
                        <p className="text-blue-100">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-center text-blue-100 mb-6">
                    Follow us on social media
                  </p>
                  <div className="flex justify-center space-x-4">
                    {[
                      {
                        icon: Facebook,
                        href: props.data?.facebook,
                        color: "hover:bg-blue-600",
                      },
                      {
                        icon: XIcon,
                        href: props.data?.twitter,
                        color: "hover:bg-blue-400",
                      },
                      {
                        icon: Youtube,
                        href: props.data?.youtube,
                        color: "hover:bg-red-600",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href || "#"}
                        className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white ${social.color} transition-all duration-300 border border-white/30`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Find Us Here
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
            </div>
            <motion.div
              className="rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Map />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
