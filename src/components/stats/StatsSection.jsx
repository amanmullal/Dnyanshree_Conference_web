import React from "react";
import CountUp from "./CountUp";

const stats = [
  { value: 153, label: "COMPLETE PROJECTS" },
  { value: 3565, label: "POSITIVE FEEDBACK" },
  { value: 786, label: "HAPPY CLIENTS" },
  { value: 20, label: "AWARDS RECEIVED" },
];

export default function StatsSection() {
  return (
    <section className="relative py-20">
      {/* Background image with reduced opacity */}
      <div className="absolute inset-0 bg-[url('/images/energy-solutions/world.jpg')] bg-cover bg-center opacity-20"></div>

      {/* Content */}
      <div className="relative container mx-auto text-center px-4">
        <p className="text-lg text-gray-900 mb-2">Best Results</p>

        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          whileHover={{ scale: 1.02 }}
        >
          For{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            the Socially Responsible Engineers
          </span>
        </h2>

        <p className=" bg-white text-gray-800 max-w-3xl mx-auto mb-16">
          To be recognized and preferred by industry for our process safety
          engineering and automation solutions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-6xl font-serif text-black">
                <CountUp end={item.value} />
              </h3>
              <p className="text-yellow-500 text-lg font-semibold mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
