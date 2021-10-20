import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart() {
  const data = {
    labels: ["This Month", "Last Week", "This Week"],
    datasets: [
      {
        data: [10, 15, 38],
        backgroundColor: ["#007bff ", "#28a745 ", "#dc3545 "],
        borderColor: ["transparent", "transparent", "transparent"],
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
