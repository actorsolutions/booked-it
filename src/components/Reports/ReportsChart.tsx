import { Pie } from "react-chartjs-2";
import CY_TAGS from "@/support/cypress_tags";
import React from "react";
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";

export const ReportsChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const typeCount: number[] = [1, 2, 1];
  const pieLabels: string[] = ["Theater", "Film", "Commercial"];
  const pieChartLabel: string = "Type Breakdown";
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Breakdown by Type",
      },
    },
  };
  const pieChartData = {
    labels: pieLabels,
    datasets: [
      {
        label: pieChartLabel,
        data: typeCount,
        backgroundColor: [
          "rgba(50, 150, 132, 1)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 25, 100, 0.2)",
        ],
        borderColor: [
          "rgba(15, 10, 222, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 5, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      legends: {
        display: true,
      },
    },
  };
  return (
    <Pie data-cy={CY_TAGS.REPORTS.PIE} data={pieChartData} options={options} />
  );
};
