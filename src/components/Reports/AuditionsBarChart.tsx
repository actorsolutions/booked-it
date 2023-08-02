import React, { useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
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
  );

  const [selectedMonthYear, setSelectedMonthYear] = useState<string | null>(
    null
  );

  const getUniqueMonthYears = (auditions: AuditionData[]): string[] => {
    const uniqueMonthYears = new Set<string>();
    auditions.forEach((audition) => {
      const date = new Date(audition.date);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
      uniqueMonthYears.add(monthYear);
    });
    return Array.from(uniqueMonthYears);
  };

  const uniqueMonthYears = getUniqueMonthYears(props.auditions);

  const handleMonthYearChange = (event: SelectChangeEvent<string>) => {
    setSelectedMonthYear(event.target.value);
  };

  const chartAuditions = (selectedMonthYear: string | null) => {
    if (!selectedMonthYear) {
      return null;
    }

    const [selectedMonth, selectedYear] = selectedMonthYear.split(" ");

    const barChartLabel: string = "Type Breakdown";
    const typeCount: number[] = [];
    const barLabels: string[] = [];

    const capitalize = (text: string): string =>
      (text && text[0].toUpperCase() + text.slice(1)) || "";

    const monthToNumber = (month: string): number => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthNames.indexOf(month);
    };

    const filteredAuditions = props.auditions.filter(
      (audition) =>
        new Date(audition.date).getFullYear() === parseInt(selectedYear) &&
        new Date(audition.date).getMonth() === monthToNumber(selectedMonth)
    );

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

  const { barChartData } = chartAuditions(selectedMonthYear) || {};

  const formattedData = barChartData
    ? {
        labels: barChartData.labels,
        datasets: [
          {
            label: barChartData.datasets[0].label,
            data: barChartData.datasets[0].data,
            backgroundColor: barChartData.datasets[0].backgroundColor,
            borderColor: barChartData.datasets[0].borderColor,
            borderWidth: barChartData.datasets[0].borderWidth,
          },
        ],
      }
    : undefined;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        top: 30,
        left: 20,
        right: 20,
        bottom: 60,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
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
        position: "relative",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          maxHeight: "35rem",
        }}
      >
        <div>
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1rem",
            }}
          >
            Auditions by Month
          </Typography>
          <Select
            label="Select Month and Year"
            value={selectedMonthYear || ""}
            onChange={handleMonthYearChange}
            sx={{ width: "200px" }}
          >
            {uniqueMonthYears.map((monthYear, index) => (
              <MenuItem key={index} value={monthYear}>
                {monthYear}
              </MenuItem>
            ))}
          </Select>
        </div>
        {formattedData && (
          <Bar
            data-cy={CY_TAGS.LANDING_PAGE.GRAPH.BAR_CHART}
            data={formattedData}
            options={options}
          />
        )}
      </Grid>
    </Grid>
  );
};
