import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Phone,
  Home,
  Users,
  Heart,
  Brain,
  Shield,
  Award,
} from "lucide-react";
import EnergyShowcase from "../components/EnergyShowcase";

const ServicesPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/src/assets/images/energy-solutions/services_banner.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Magnox Energy and
                <br />
                <span className="gradient-text">Renewable Services</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                Sustainable Energy Solutions and Environmental Consulting for
                Individuals, Businesses, and Communities
              </p>
            </motion.div>

            {/* Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white text-center lg:text-right"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                SUSTAINABLE SOLUTIONS FOR BUSINESSES, COMMUNITIES, & INDUSTRIES
              </h2>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Welcome Section */}
      <section className="py-20 md:py-10 px-6 absolute top-auto left-1/2 -translate-x-1/2 w-full rounded-none bg-white shadow-2xl md:top-[602px] md:w-[80%] md:rounded-[16px]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-semibold mb-3 text-sm"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Energy Solutions
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
              >
                Powering Tomorrow's World
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base text-gray-600 max-w-2xl mx-auto"
              >
                Comprehensive renewable energy solutions for sustainability and
                efficiency.
              </motion.p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="mb-6">
              Magnox Energy Solutions is a group of experienced professional
              renewable energy providers working together to serve global
              communities. We provide sustainable energy solutions for
              individuals, businesses, and industries. We conduct environmental
              evaluations for a variety of concerns including Solar
              Installation, Wind Energy, Biogas Systems, Hydro Power, Battery
              Storage, and Grid Integration.
            </p>
            <p className="mb-6">
              We help identify sustainable opportunities and make specific
              recommendations to clients, families, schools, and organizations
              to help our clients achieve energy independence and environmental
              sustainability. Regardless of the presenting concern, we strive to
              understand and support you as you work to implement cleaner energy
              solutions. We look forward to working with you to achieve greater
              environmental, economic, and energy health.
            </p>
            <EnergyShowcase />
          </motion.div>
        </div>
      </section>
      {/* Spacer to account for absolute positioned content - increased height */}
      <div className="h-[1200px]"></div>
    </div>
  );
};

export default ServicesPage;
