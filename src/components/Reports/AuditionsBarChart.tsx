import React from "react";
import { Bar } from "react-chartjs-2";
import { AuditionData } from "@/types";
import { audition_types } from "@prisma/client";
import { Chart as ChartJS, Tooltip, Legend, Title } from "chart.js";

interface BarProps {
  auditions: AuditionData[];
}
export const AuditionBarChart = (props: BarProps) => {
  ChartJS.register(Tooltip, Legend, Title);
  const { auditions } = props;

  const barChartAuditions = (auditions: AuditionData[]) => {
    const barChartLabel: string = "Auditions by Type by Month";
    const typeCount: number[] = [];
    const barLabels: string[] = [];
  };

  const currentMonth = new Date().getMonth();
  const filteredAuditions = auditions.filter(
    (audition) => new Date(audition.date).getMonth() === currentMonth
  );
};

// Step 4: Process auditions to count occurrences of each type using the audition_types enum
// const typeCounts: { [type in keyof typeof audition_types]: number } = {
//   television: 0,
//   film: 0,
//   student: 0,
//   theater: 0,
//   industrial: 0,
//   commercial: 0,
//   newMedia: 0,
//   voiceOver: 0,
// };
//
// auditions.forEach((audition) => {
//   const { type } = audition;
//   if (type in audition_types) {
//     typeCounts[type] += 1;
//   }
// });
//
// // Step 5: Prepare data for the bar chart using audition_types enum
// const barChartData = {
//   labels: Object.values(audition_types), // Use the type names as labels
//   datasets: [
//     {
//       label: "Audition Types",
//       data: Object.values(typeCounts), // Use the typeCounts object values
//       backgroundColor: "rgba(54, 162, 235, 0.2)",
//       borderColor: "rgba(54, 162, 235, 1)",
//       borderWidth: 1,
//     },
//   ],
// };
//
// // Step 6: Options for the bar chart, including tooltip, legend, and title (same as before)
// const options = {
//   responsive: true,
//   plugins: {
//     tooltip: {
//       mode: "index",
//       intersect: false,
//     },
//     legend: {
//       position: "right" as const,
//     },
//     title: {
//       display: true,
//       text: "Audition Types for Current Month",
//     },
//   },
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//       beginAtZero: true,
//     },
//   },
// };
//
// return (
//   <div>
//     <Bar data={barChartData} options={options} />
//   </div>
// );
