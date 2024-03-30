import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SanityMobilePreview from "sanity-mobile-preview";
import "sanity-mobile-preview/dist/index.css?raw";
import "./CreateFeed.css";

const theme = {
  primaryColor: "#007bff",
  secondaryColor: "#f9f9f9",
  textColor: "#333",
};

// Styled components
const Container = styled.div`
  max-width: 1000px;
  margin: 20px auto 0;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: "#007bff";
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: "#007bff";
  }
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const Button = styled.button`
  padding: 12px 24px;
  margin-right: 10px;
  background-color: "#007bff";
  color: black;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

/**
 * Component for managing news feeds.
 * Allows users to view, edit, and delete news feeds.
 */
const ManageNewsFeeds = () => {
  const [news, setnews] = useState([]);

  // Fetch news feed data on component mount
  useEffect(() => {
    try {
      fetch("http://localhost:8000/")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Response not found");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          setnews(data);
        });
    } catch (error) {
      console.error("Error getting Data", error);
    }
  }, []);

  // Handle deletion of news feed
  const handleDel = async (index) => {
    let feed = news[index];
    console.log(feed.file);
    const upData = new FormData();

    upData.append("title", feed.title);
    upData.append("category", feed.category);
    console.log(upData);
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "DELETE",
        body: upData,
      });

      if (!response.ok) {
        throw new Error("Failed to update form");
      } else {
        // Reload page after deletion
        window.location.reload();
        console.log("Form Updatede successfully");
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  // Helper function to check file extension
  const checkFile = (file) => {
    const fileExtension = file.split(".").pop();
    console.log(fileExtension); // Output: jpg
    return fileExtension;
  };

  // Helper functions to check if file is image or video
  const isImage = (ext) => {
    const imgExt = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const lcExtension = ext.toLowerCase();
    return imgExt.includes(lcExtension);
  };

  const isVideo = (ext) => {
    const vidExt = ["mp4", "avi", "mov", "wmv", "mkv", "flv", "webm"];
    const lCExtension = ext.toLowerCase();
    return vidExt.includes(lCExtension);
  };

  // Helper function to create URL for file
  const crUrl = (url1) => {
    const url2 = "http://localhost:8000/";
    console.log(url2 + url1);
    return url2 + url1;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h2>Manage News Feeds</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Creation Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {news.map((feed, index) => (
              <TableRow key={index}>
                <TableCell>{feed.title}</TableCell>
                <TableCell>{feed.category}</TableCell>
                <TableCell>{feed.date}</TableCell>
                <TableCell>{feed.status}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                  <Button
                    onClick={() => {
                      handleDel(index);
                    }}
                  >
                    Delete
                  </Button>
                  {/* Popup for viewing detail */}
                  <Popup trigger={<Button> View Detail </Button>} modal nested>
                    {(close) => (
                      <div className="modal mobile-scrollable-div ">
                        <div className="mobile-preview-container">
                          <div className="mobile-preview">
                            <SanityMobilePreview>
                              <div className="mobile-scrollable-div">
                                <p className="preview-category">
                                  {feed.category}
                                </p>
                                <h4 className="preview-title">{feed.title}</h4>
                                {feed.fileUrl ? (
                                  isImage(checkFile(feed.fileUrl)) ? (
                                    <img
                                      className="preview-image"
                                      src={crUrl(feed.fileUrl)}
                                      alt="Preview"
                                    />
                                  ) : isVideo(checkFile(feed.fileUrl)) ? (
                                    <video className="preview-video" controls>
                                      <source
                                        src={
                                          "http://localhost:8000/${feed.fileUrl}"
                                        }
                                        type={checkFile(feed.fileUrl)}
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : (
                                    <p>File type not supported for preview.</p>
                                  )
                                ) : (
                                  <p>No file</p>
                                )}
                                <p className="preview-content">
                                  {feed.content}
                                </p>
                              </div>
                            </SanityMobilePreview>
                          </div>
                        </div>
                        <div>
                          <Button onClick={() => close()}>Close</Button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
    </ThemeProvider>
  );
};

export default ManageNewsFeeds;
