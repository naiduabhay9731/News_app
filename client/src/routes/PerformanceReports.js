import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Styled components for the performance reports component
const theme = {
  primaryColor: "#007bff",
  secondaryColor: "#f9f9f9",
  textColor: "#333",
};

// Updated styled components with new theme
const Container = styled.div`
  max-width: 800px;
  margin: 20px auto 0;
  padding: 20px;
  background-color: ${theme.secondaryColor}; /* Updated to use secondary color */
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${theme.textColor}; /* Updated to use text color */
  text-align: center;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// PerformanceReports component definition
const PerformanceReports = () => {
  // Sample data for performance metrics
  const data = [
    { name: "News Feed 1", views: 200, likes: 100, engagementRate: 10 },
    { name: "News Feed 2", views: 300, likes: 150, engagementRate: 15 },
    { name: "News Feed 3", views: 400, likes: 200, engagementRate: 20 },
    { name: "News Feed 4", views: 500, likes: 250, engagementRate: 25 },
    { name: "News Feed 5", views: 600, likes: 300, engagementRate: 30 },
  ];

  return (
    <Container>
      {/* Title for the performance reports */}
      <Title>Performance Reports</Title>
      {/* Container for the chart */}
      <ChartContainer>
        {/* Bar chart to display performance metrics */}
        <BarChart width={600} height={300} data={data}>
          {/* Cartesian grid for the chart */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-axis representing news feed names */}
          <XAxis dataKey="name" />
          {/* Y-axis */}
          <YAxis />
          {/* Tooltip for displaying information on hover */}
          <Tooltip />
          {/* Legend for the chart */}
          <Legend />
          {/* Bars representing views, likes, and engagement rate */}
          <Bar dataKey="views" stackId="a" fill="#007bff" />
          <Bar dataKey="likes" stackId="a" fill="#28a745" />
          <Bar dataKey="engagementRate" stackId="a" fill="#ffc107" />
        </BarChart>
      </ChartContainer>
    </Container>
  );
};

export default PerformanceReports;
