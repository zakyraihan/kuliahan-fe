import React from "react";

const Shimmer = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md p-6 inline-flex items-center shimmer"
          >
            <div className="shimmer-item w-full h-6 bg-gray-300 dark:bg-gray-700"></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
