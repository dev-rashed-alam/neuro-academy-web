import React from "react";
import { Line } from "react-chartjs-2";

function LineChart() {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Profits",
        data: [100, 250, 110, 300, 110, 350, 130],
        borderColor: ["#01cf6b"],
        backgroundColor: ["transparent"],
        pointBorderColor: "#01cf6b",
        pointBackgroundColor: "#fff",
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: 50,
            fontColor: "#fff",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "#fff",
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
