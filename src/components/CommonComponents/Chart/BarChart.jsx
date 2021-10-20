import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [60, 30, 50, 70, 50, 55, 55, 33, 30, 29, 23, 55],
        borderColor: ["#01cf6b"],
        backgroundColor: [
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
          "#01cf6b",
        ],
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
          display: false,
        },
      ],
      xAxes: [
        {
          display: false,
        },
      ],
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;
