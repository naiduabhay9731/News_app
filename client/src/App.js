import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import NavBar from "./Navbar";
import CreateNewsFeed from "./routes/CreateFeed";
import ManageNewsFeeds from "./routes/ManageFeed";
import PerformanceReports from "./routes/PerformanceReports";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/CreateFeed" element={<CreateNewsFeed />} />
        <Route path="/ManageFeed" element={<ManageNewsFeeds />} />
        <Route path="/PerformanceReports" element={<PerformanceReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
