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
    backgroundColor: isDarkMode ? "#212121" : "",
    legend: {
      textStyle: { color: isDarkMode ? "white" : "black", fontSize: 12 },
    },
    hAxis: {
      textStyle: {
        color: isDarkMode ? "white" : "black",
        fontSize: 12,
        width: "100%",
      },
      slantedText: true,
      maxTextLines: 3,
    },
    vAxis: {
      textStyle: {
        color: isDarkMode ? "white" : "black",
        fontSize: 12,
        width: "100%",
      },
      slantedText: true,
      maxTextLines: 3,
    },
    titleTextStyle: {
      color: isDarkMode ? "white" : "black",
      fontSize: 16,
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
