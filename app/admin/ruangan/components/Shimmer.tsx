import React from "react";

const RuanganShimmer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="relative border dark:border-gray-600 border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 animate-pulse"
            >
              <div className="bg-gray-300 h-48"></div>
              <div className="p-4 bg-white dark:bg-gray-600">
                <div className="w-3/4 h-6 bg-gray-300 mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RuanganShimmer;
