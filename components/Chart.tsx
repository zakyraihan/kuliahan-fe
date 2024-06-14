import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const ChartGoogle: React.FC<any> = ({ chartType, data }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(theme);
  }, []);

  const chartOptions = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
  };

  return (
    <>
      <Chart
        chartType={chartType}
        data={data}
        width="590px"
        height="300px"
        options={chartOptions}
        legendToggle
      />
    </>
  );
};

export default ChartGoogle;
