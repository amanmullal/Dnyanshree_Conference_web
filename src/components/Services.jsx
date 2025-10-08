import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Zap,
  Settings,
  FileCheck,
  Factory,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Services = (props) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollContainerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Debug: Log the data to see what's being passed
  console.log("Services data:", props.data);

  const scrollToCard = (index) => {
    if (scrollContainerRef.current && !isScrollingRef.current) {
      isScrollingRef.current = true;
      const container = scrollContainerRef.current;

      // Responsive card width calculation
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 320 : 416; // Smaller cards on mobile

      // Calculate the target scroll position
      const targetScrollLeft = cardWidth * index;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });

      setCurrentIndex(index);

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };

  const scrollLeft = () => {
    if (!props.data || props.data.length === 0) return;

    const newIndex =
      currentIndex === 0 ? props.data.length - 1 : currentIndex - 1;
    scrollToCard(newIndex);
  };

  const scrollRight = () => {
    if (!props.data || props.data.length === 0) return;

    const newIndex =
      currentIndex === props.data.length - 1 ? 0 : currentIndex + 1;
    scrollToCard(newIndex);
  };

  // Handle manual scroll to update current index
  const handleScroll = (e) => {
    if (isScrollingRef.current) return;

    const container = e.target;
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 320 : 416;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (
      newIndex !== currentIndex &&
      newIndex >= 0 &&
      newIndex < (props.data?.length || 0)
    ) {
      setCurrentIndex(newIndex);
    }
  };

  // Initialize scroll position
  React.useEffect(() => {
    if (scrollContainerRef.current && props.data && props.data.length > 0) {
      scrollContainerRef.current.scrollLeft = 0;
      setCurrentIndex(0);
    }
  }, [props.data]);

  // Dynamic icon mapping based on service names and content
  const iconMap = {
    0: Users, // Consultancy - represents consulting/advisory
    1: Zap, // Renewable Energy - represents energy/power
    2: Settings, // Control Panels - represents technical controls/engineering
    3: FileCheck, // SEM & OA Services - represents documentation/approval processes
    4: Factory, // Industrial Electrical Turnkey Projects - represents industrial/manufacturing
    5: PieChart, // Keep existing for the last service
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section
      id="services"
      className="section-padding bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white relative overflow-hidden"
      ref={ref}
    >
      {/* Simplified background elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative">
        {/* Section Title - Mobile Optimized */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Services
            </span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-blue-100 max-w-6xl mx-auto leading-relaxed px-4">
            <strong>Magnox Energy Solutions LLP</strong> delivers a
            comprehensive range of services for wind and solar projects, from
            efficient power evacuation to seamless regulatory compliance.
            Discover how our expertise can drive your renewable energy success.
          </p>
        </motion.div>

        {/* Carousel Container - Mobile Optimized */}
        <div className="relative mb-16 md:mb-8">
          {/* Left Arrow Button - Fixed Alignment */}
          <button
            type="button"
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:left-1 z-30 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 group-focus:ring-4 group-focus:ring-white/70 group-focus:outline-none transition-all duration-300 shadow-lg">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <span className="sr-only">Previous</span>
            </span>
          </button>

          {/* Right Arrow Button - Fixed Alignment */}
          <button
            type="button"
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:right-1 z-30 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 group-focus:ring-4 group-focus:ring-white/70 group-focus:outline-none transition-all duration-300 shadow-lg">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <span className="sr-only">Next</span>
            </span>
          </button>

          {/* Carousel Wrapper - Fixed Card Clipping */}
          <div className="relative h-auto overflow-hidden rounded-lg px-12 md:px-14">
            {/* Services Container - Prevent Card Clipping */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide py-4 scroll-smooth touch-pan-x"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
                paddingLeft: "4px", // Extra padding to prevent clipping
                paddingRight: "4px", // Extra padding to prevent clipping
              }}
              onScroll={handleScroll}
            >
              {props.data &&
              Array.isArray(props.data) &&
              props.data.length > 0 ? (
                props.data.map((service, index) => {
                  const IconComponent = iconMap[index] || PieChart;

                  return (
                    <motion.div
                      key={`${service.name}-${index}`}
                      variants={itemVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      whileHover={{
                        y: -15,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      className="group flex-shrink-0 w-full md:w-96"
                      style={{ scrollSnapAlign: "start" }}
                    >
                      <div className="relative h-full">
                        {/* Card background - Prevent Border Clipping */}
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[40px_10px] p-6 md:p-10 h-full group-hover:border-white/30 transition-all duration-500 min-h-[360px] md:min-h-[400px] mb-4 mx-1">
                          {/* Background glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[40px_10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Icon container with working animations */}
                          <div className="relative mb-6 md:mb-8 flex justify-center">
                            <motion.div
                              className="relative"
                              animate={{
                                y: [0, -8, 0],
                                rotate: [0, 2, -2, 0],
                              }}
                              transition={{
                                duration: 3 + index * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              whileHover={{
                                scale: 1.1,
                                rotate: [0, -5, 5, 0],
                                transition: { duration: 0.5 },
                              }}
                            >
                              {/* Main icon container */}
                              <motion.div
                                className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-2xl relative overflow-hidden"
                                animate={{
                                  boxShadow: [
                                    "0 0 20px rgba(59, 130, 246, 0.4)",
                                    "0 0 30px rgba(147, 51, 234, 0.5)",
                                    "0 0 20px rgba(59, 130, 246, 0.4)",
                                  ],
                                }}
                                transition={{
                                  duration: 2 + index * 0.3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                {/* Shimmer effect */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                  animate={{
                                    x: ["-100%", "200%"],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: index * 0.5,
                                  }}
                                />

                                {/* Icon with rotation */}
                                <motion.div
                                  animate={{
                                    rotate: [0, 360],
                                  }}
                                  transition={{
                                    duration: 15 + index * 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                >
                                  <IconComponent className="w-10 h-10 md:w-12 md:h-12 relative z-10" />
                                </motion.div>
                              </motion.div>

                              {/* Pulsing ring */}
                              <motion.div
                                className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 border-2 border-blue-400/50 rounded-xl md:rounded-2xl"
                                animate={{
                                  scale: [1, 1.15, 1],
                                  opacity: [0.7, 0.3, 0.7],
                                }}
                                transition={{
                                  duration: 2 + index * 0.2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            </motion.div>
                          </div>

                          {/* Content - Mobile Optimized */}
                          <div className="relative text-center">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-blue-300 transition-colors duration-300">
                              {service.name}
                            </h3>
                            <p className="text-sm md:text-base text-blue-100/90 leading-relaxed group-hover:text-white/90 transition-colors duration-300 line-clamp-4">
                              {service.text}
                            </p>
                          </div>

                          {/* Bottom accent */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:w-16 md:group-hover:w-20 transition-all duration-500"></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="flex-shrink-0 w-80 md:w-96 text-center min-h-[360px] md:min-h-[400px] flex flex-col justify-center mb-4">
                  <div className="text-blue-200 text-lg md:text-xl mb-4">
                    {!props.data
                      ? "Loading our services..."
                      : "No services available"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slider Indicators (Dots) - Fixed Positioning */}
          {props.data && props.data.length > 0 && (
            <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
              {props.data.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white opacity-100 scale-110"
                      : "bg-white/40 hover:bg-white/60 opacity-60 hover:scale-105"
                  }`}
                  aria-current={index === currentIndex}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => scrollToCard(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA - Mobile Optimized */}
        <motion.div
          className="text-center mt-12 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="#testimonials"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-blue-900 bg-white hover:bg-blue-50 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            See What Our Clients Say
          </a>
        </motion.div>
      </div>

      {/* Custom scrollbar hiding styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
