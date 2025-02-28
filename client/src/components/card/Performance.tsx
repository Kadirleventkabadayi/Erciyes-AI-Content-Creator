"use client";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import CardFilter from "../filter/CardFilter";
import { LineChart } from "@mui/x-charts";
import { performanceFilters } from "@/lib/conts";

interface PerformaceProps {
  dataSeries: { color: string; label: string; data: number[] }[];
}

const Performance: React.FC<PerformaceProps> = ({ dataSeries }) => {
  const [filter, setFilter] = useState(performanceFilters[0]);
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const filterSeries = (filter: string, series: typeof dataSeries) => {
    if (filter === "All") {
      return series;
    }
    return series.filter((item) => item.label === filter);
  };

  return (
    <Card component="form" sx={{ margin: 2, width: "96.5%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 2,
        }}
      >
        <CardHeader title={"PERFORMANCE"} />
        <CardFilter
          filterState={filter}
          handleChange={handleChange}
          filters={performanceFilters}
        />
      </Box>
      <CardContent>
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            },
          ]}
          series={filterSeries(filter, dataSeries)}
          sx={{ width: "100%" }}
          height={300}
        />
      </CardContent>
    </Card>
  );
};

export default Performance;
