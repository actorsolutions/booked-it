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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    currentMonth
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(currentYear);

  const getUniqueMonths = (auditions: AuditionData[]): number[] => {
    const uniqueMonths = new Set<number>();
    auditions.forEach((audition) => {
      const month = new Date(audition.date).getMonth();
      uniqueMonths.add(month);
    });
    return Array.from(uniqueMonths);
  };

  const getUniqueYears = (auditions: AuditionData[]): number[] => {
    const uniqueYears = new Set<number>();
    auditions.forEach((audition) => {
      const year = new Date(audition.date).getFullYear();
      uniqueYears.add(year);
    });
    return Array.from(uniqueYears);
  };

  const uniqueMonths = getUniqueMonths(props.auditions);
  const uniqueYears = getUniqueYears(props.auditions);

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
    maintainAspectRatio: false, // Make the chart responsive to parent container size
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Breakdown by Type",
      },
    },
    layout: {
      padding: {
        top: 30, // Increase top padding to make room for the title
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false, // Prevent automatic skipping of labels
          maxRotation: 45, // Rotate x-axis labels for better visibility
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true, // Start y-axis at 0
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
          maxHeight: "35rem",
        }}
      >
        <div>
          <Select
            label="Select Month"
            value={selectedMonth || ""}
            onChange={handleMonthChange}
          >
            {uniqueMonths.map((month, index) => (
              <MenuItem key={index} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Select Year"
            value={selectedYear || ""}
            onChange={handleYearChange}
          >
            {uniqueYears.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
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
