import React from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto 0;
  padding: 40px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Section = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const ActivityList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ActivityItem = styled.li`
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
`;

const StatisticItem = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
`;

const Dashboard = () => {
  // Sample data (replace with actual data fetched from API)
  const userActivityData = [
    { username: "user1", activity: "logged in" },
    { username: "user2", activity: "posted a comment" },
    { username: "user3", activity: "shared a news article" },
    // More activity data...
  ];

  const contentStatisticsData = {
    totalUsers: 1000,
    totalNews: 500,
    // More statistics...
  };

  const topNewsData = [
    { title: "Top News 1", views: 100, shares: 50, comments: 30 },
    { title: "Top News 2", views: 90, shares: 40, comments: 25 },
    // More top news data...
  ];

  return (
    <Container>
      {/* User Activity */}
      <Section>
        <Title>User Activity</Title>
        <ActivityList>
          {userActivityData.map((activity, index) => (
            <ActivityItem key={index}>
              <strong>{activity.username}</strong>: {activity.activity}
            </ActivityItem>
          ))}
        </ActivityList>
      </Section>

      {/* Content Statistics */}
      <Section>
        <Title>Content Statistics</Title>
        <StatisticItem>
          Total Users: {contentStatisticsData.totalUsers}
        </StatisticItem>
        <StatisticItem>
          Total News: {contentStatisticsData.totalNews}
        </StatisticItem>
        {/* Add more statistics here */}
      </Section>

      {/* Top Performed News */}
      <Section>
        <Title>Top Performed News</Title>
        <ul>
          {topNewsData.map((news, index) => (
            <li key={index}>{news.title}</li>
          ))}
        </ul>
      </Section>

      {/* Top Shared News */}
      <Section>
        <Title>Top Shared News</Title>
        <ul>
          {topNewsData.map((news, index) => (
            <li key={index}>{news.title}</li>
          ))}
        </ul>
      </Section>

      {/* Top Commented News */}
      <Section>
        <Title>Top Commented News</Title>
        <ul>
          {topNewsData.map((news, index) => (
            <li key={index}>{news.title}</li>
          ))}
        </ul>
      </Section>
    </Container>
  );
};

export default Dashboard;
