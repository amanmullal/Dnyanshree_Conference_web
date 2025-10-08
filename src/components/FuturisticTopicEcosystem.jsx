import React, { useState } from "react";
import { motion } from "framer-motion";

// Import portfolio images
import portfolio01 from "../assets/images/portfolio/01-large.jpg";
import portfolio02 from "../assets/images/portfolio/02-large.jpg";
import portfolio03 from "../assets/images/portfolio/03-large.jpg";
import portfolio04 from "../assets/images/portfolio/04-large.jpg";
import portfolio05 from "../assets/images/portfolio/05-large.jpg";

const ElectricityNetworkEcosystem = () => {
  const [activeNode, setActiveNode] = useState(null);

  const energySolutions = [
    {
      id: "smart-top",
      title: "Smart",
      description: "Smart Grid Management",
      details:
        "Real-time monitoring and intelligent automation systems for enhanced grid performance.",
      image: portfolio01,
      position: { top: "20%", right: "15%" },
    },
    {
      id: "power-top",
      title: "Power",
      description: "Power Transmission",
      details:
        "High-voltage transmission line infrastructure for efficient power delivery.",
      image: portfolio02,
      position: { top: "20%", right: "5%" },
    },
    {
      id: "renewable",
      title: "Renewable",
      description: "Renewable Integration",
      details:
        "Clean energy network connectivity and sustainable power solutions.",
      image: portfolio04,
      position: { bottom: "30%", left: "15%" },
    },
    {
      id: "smart-bottom",
      title: "Smart",
      description: "Smart Infrastructure",
      details:
        "Next-generation electrical systems with IoT and AI optimization.",
      image: portfolio05,
      position: { bottom: "30%", right: "10%" },
    },
  ];

  const statistics = [
    { value: "99.9%", label: "Network Reliability" },
    { value: "50+", label: "Grid Connections" },
    { value: "24/7", label: "Monitoring" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Single Card Container */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${portfolio01})`,
            }}
          >
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/30"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 p-12 h-full">
            {/* Header Section */}
            <motion.div
              className="max-w-md mb-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Electricity
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                Enabling secure data exchange and asset identity management to
                enhance liquidity, reliability, and security in electricity
                networks.
              </p>
            </motion.div>

            {/* Network Diagram */}
            <div className="relative">
              {/* Central Power Box */}
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative">
                  <div className="w-24 h-16 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-2 border-blue-300 flex items-center justify-center">
                    <span className="text-sm font-semibold text-slate-700">
                      Power
                    </span>
                  </div>
                  {/* Central node image */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg">
                      <img
                        src={portfolio03}
                        alt="Power"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {energySolutions.map((solution, index) => {
                  // Calculate line positions
                  let x1 = "50%",
                    y1 = "50%";
                  let x2, y2;

                  if (solution.position.left) {
                    x2 = solution.position.left;
                  } else if (solution.position.right) {
                    x2 = `${100 - parseInt(solution.position.right)}%`;
                  }

                  if (solution.position.top) {
                    y2 = solution.position.top;
                  } else if (solution.position.bottom) {
                    y2 = `${100 - parseInt(solution.position.bottom)}%`;
                  }

                  return (
                    <motion.line
                      key={`line-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#60A5FA"
                      strokeWidth="2"
                      opacity="0.7"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.2 + 0.8 }}
                    />
                  );
                })}
              </svg>

              {/* Solution Nodes */}
              {energySolutions.map((solution, index) => (
                <motion.div
                  key={solution.id}
                  className="absolute cursor-pointer"
                  style={solution.position}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15 + 1,
                    type: "spring",
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() =>
                    setActiveNode(
                      activeNode === solution.id ? null : solution.id
                    )
                  }
                >
                  <div className="relative">
                    {/* Node Circle */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-lg bg-white">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Node Label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-md border border-gray-200">
                      <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                        {solution.title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Statistics Cards */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-6">
                {statistics.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 text-center min-w-[120px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-slate-600 text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Expanded Info Panel */}
            {activeNode && (
              <motion.div
                className="absolute top-20 right-8 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-6 z-50"
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  const solution = energySolutions.find(
                    (s) => s.id === activeNode
                  );
                  return (
                    <>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {solution?.description}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        {solution?.details}
                      </p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-700">
                            High-voltage transmission lines
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-700">
                            Substation automation systems
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-700">
                            Power quality monitoring
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-700">
                            Grid synchronization technology
                          </span>
                        </div>
                      </div>
                      <button className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors">
                        Learn More
                      </button>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ElectricityNetworkEcosystem;
