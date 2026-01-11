import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="container-custom">
        <div className="text-center">
          <motion.p
            className="text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            &copy; 2026 DIET, Satara, Maharashtra.
          </motion.p>

          {/* Scroll to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full text-white transition-all duration-300 group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
