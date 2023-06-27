import Grid from "@mui/material/Grid";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { AuditionData } from "@/types";
import CY_TAGS from "@/support/cypress_tags";
interface MetricProps {
  auditions: AuditionData[];
}
export const PieChart = (props: MetricProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const { auditions } = props;
  const chartAuditions = (auditions: AuditionData[]) => {
    const pieChartLabel: string = "Type Breakdown";
    const typeCount: number[] = [];
    const pieLabels: string[] = [];

    const capitalize = (text: string): string =>
      (text && text[0].toUpperCase() + text.slice(1)) || "";

    auditions.forEach((audition) => {
      const label = capitalize(audition.type);
      // Check to see if label exists, add if not.
      if (!pieLabels.includes(label)) {
        pieLabels.push(label);
        // Add count of each label to data obj
        const filterByType = auditions.filter(
          (filteredAudition) => filteredAudition.type === audition.type
        );
        typeCount.push(filterByType.length);
      }
    });

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

    return { pieChartData };
  };

  const { pieChartData } = chartAuditions(auditions);
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
        <Pie
          data-cy={CY_TAGS.LANDING_PAGE.GRAPH.PIE_CHART}
          data={pieChartData}
          options={options}
        />
        <p>Number of Auditions - {auditions.length}</p>
      </Grid>
    </Grid>
  );
};
