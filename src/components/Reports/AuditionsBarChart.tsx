import React, { useState } from "react";
import { Grid, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AuditionData } from "@/types";
import CY_TAGS from "@/support/cypress_tags";

interface MetricProps {
  auditions: AuditionData[];
}

export const AuditionBarChart = (props: MetricProps) => {
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
  ); // Register BarElement for the bar chart

  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(event.target.value as number);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  const chartAuditions = (auditions: AuditionData[]) => {
    const barChartLabel: string = "Type Breakdown"; // Change label for the bar chart
    const typeCount: number[] = [];
    const barLabels: string[] = [];

    const capitalize = (text: string): string =>
      (text && text[0].toUpperCase() + text.slice(1)) || "";

    const filteredAuditions =
      selectedMonth && selectedYear
        ? auditions.filter(
            (audition) =>
              new Date(audition.date).getFullYear() === selectedYear &&
              new Date(audition.date).getMonth() === selectedMonth
          )
        : auditions;

    filteredAuditions.forEach((audition) => {
      const label = capitalize(audition.type);
      if (!barLabels.includes(label)) {
        barLabels.push(label);
        const filterByType = filteredAuditions.filter(
          (filteredAudition) => filteredAudition.type === audition.type
        );
        typeCount.push(filterByType.length);
      }
    });

    const barChartData = {
      labels: barLabels,
      datasets: [
        {
          label: barChartLabel,
          data: typeCount,
          backgroundColor: [
            "rgba(50, 150, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(255, 25, 100, 0.8)",
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
    };

    return { barChartData };
  };

  const { barChartData } = chartAuditions(props.auditions);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Breakdown by Type",
      },
    },
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        sx={{
          maxHeight: "30rem",
        }}
      >
        <div>
          <Select
            label="Select Month"
            value={selectedMonth || ""}
            onChange={handleMonthChange}
          >
            <MenuItem value={0}>January</MenuItem>
            <MenuItem value={1}>February</MenuItem>
            <MenuItem value={2}>March</MenuItem>
            {/* Add other months */}
          </Select>
          <Select
            label="Select Year"
            value={selectedYear || ""}
            onChange={handleYearChange}
          >
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            {/* Add other years */}
          </Select>
        </div>
        <Bar // Use Bar component for the bar chart
          data-cy={CY_TAGS.LANDING_PAGE.GRAPH.BAR_CHART} // Adjust data-cy tag if needed
          data={barChartData} // Use barChartData instead of pieChartData
          options={options}
        />
        <p>Number of Auditions - {props.auditions.length}</p>
      </Grid>
    </Grid>
  );
};
