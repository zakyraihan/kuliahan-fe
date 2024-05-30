import React from "react";

const ShimmerMahasiswa = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200 dark:divide-abu">
        <thead className="bg-gray-50 dark:bg-abu">
          <tr>
            <th className="px-6 py-3 w-1/6"></th>
            <th className="px-6 py-3 w-1/6"></th>
            <th className="px-6 py-3 w-1/6"></th>
            <th className="px-6 py-3 w-1/6"></th>
            <th className="px-6 py-3 w-1/6"></th>
            <th className="px-6 py-3 w-1/6"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-abu">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap w-1/6">
                  <div className="w-16 h-8 bg-gray-300 dark:bg-abu"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/6">
                  <div className="w-16 h-8 bg-gray-300 dark:bg-abu"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/6">
                  <div className="w-16 h-8 bg-gray-300 dark:bg-abu"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/6">
                  <div className="w-16 h-8 bg-gray-300 dark:bg-abu"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/6">
                  <div className="w-16 h-8 bg-gray-300 dark:bg-abu"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-1/6">
                  <div className="w-16 h-8 bg-gray-300 dark:bg-abu"></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShimmerMahasiswa;
