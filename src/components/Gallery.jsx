import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, Eye, Heart, Share2, Download } from "lucide-react";

export const Gallery = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState(new Set());

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Enhanced gallery data with categories and effects
  const galleryData = props.data
    ? props.data.map((item, index) => {
        return {
          ...item,
          id: index,
          // Use the URLs directly from the data
          smallImage: item.smallImage,
          largeImage: item.largeImage,
          category: [
            "Antiques Trading",
            "Bauxite Mining & Trading",
            "Power Transmission EPC",
            "Control Panel Manufacturing",
            "NDT - Radiography Testing",
            "NDT - Ultrasonic Testing",
            "Minerals & Gemstones",
            "Energy Metering Solutions",
            "Electrical EPC Projects",
          ][index],
          views: Math.floor(Math.random() * 1000) + 100,
          likes: Math.floor(Math.random() * 50) + 5,
          color: [
            "#ff6b6b",
            "#4ecdc4",
            "#45b7d1",
            "#f9ca24",
            "#f0932b",
            "#eb4d4b",
          ][index % 6],
        };
      })
    : [];

  // eslint-disable-next-line no-unused-vars
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
  };

  const handleLike = (imageId, e) => {
    e.stopPropagation();
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  return (
    <section
      id="portfolio"
      className="section-padding bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden"
      ref={ref}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Portfolio
            </span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore our innovative projects and creative solutions
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {galleryData.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="relative group cursor-pointer"
              onClick={() => handleImageClick(image, index)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-2xl">
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-800">
                  <img
                    src={image.smallImage}
                    alt={image.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    onLoad={(e) => {
                      e.target.style.opacity = "1";
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                    style={{ opacity: 1 }}
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-2">
                      {image.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-white/80 text-sm">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{image.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart
                            className={`w-4 h-4 cursor-pointer transition-colors ${
                              likedImages.has(image.id)
                                ? "text-red-500 fill-current"
                                : "text-white/80"
                            }`}
                            onClick={(e) => handleLike(image.id, e)}
                          />
                          <span>
                            {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                          </span>
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Share2 className="w-4 h-4 text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: -15 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating particles effect on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-3 py-1 text-xs font-bold rounded-full text-white backdrop-blur-md border border-white/30"
                    style={{ backgroundColor: `${image.color}80` }}
                  >
                    {image.category}
                  </span>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `0 0 30px ${image.color}40`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: 45 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: -45 }}
                transition={{ type: "spring", damping: 25, duration: 0.5 }}
                className="relative w-full max-w-5xl mx-auto bg-white/10 rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Consistent sized image container */}
                  <div className="w-full h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">
                    <img
                      src={selectedImage.largeImage}
                      alt={selectedImage.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to small image if large image fails
                        e.target.src = selectedImage.smallImage;
                      }}
                    />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                    <h3 className="text-white text-lg md:text-2xl font-bold mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">
                      {selectedImage.category}
                    </p>
                    <div className="flex items-center space-x-4 text-white/70 text-sm md:text-base">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{selectedImage.views} views</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{selectedImage.likes} likes</span>
                      </span>
                    </div>
                  </div>

                  {/* Improved close button */}
                  <motion.button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 flex items-center justify-center border border-white/30 hover:border-white/50 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
