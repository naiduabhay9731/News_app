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

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 20px auto 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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
      <Title>Performance Reports</Title>
      <ChartContainer>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="views" stackId="a" fill="#007bff" />
          <Bar dataKey="likes" stackId="a" fill="#28a745" />
          <Bar dataKey="engagementRate" stackId="a" fill="#ffc107" />
        </BarChart>
      </ChartContainer>
    </Container>
  );
};

export default PerformanceReports;
