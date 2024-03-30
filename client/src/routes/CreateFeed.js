import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import SanityMobilePreview from "sanity-mobile-preview";
import "sanity-mobile-preview/dist/index.css?raw";
import "./CreateFeed.css";


const theme = {
  primaryColor: "#007bff",
  secondaryColor: "#fff",
  textColor: "#333",
  borderColor: "#ccc",
};


/**
 * Component for creating news feed.
 * Allows users to create and publish news articles.
 */
const CreateNewsFeed = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [status,setStatus]=useState("Draft");
  
  /**
   * Handles file change event.
   * @param {Object} e - Event object
   */
  const handleFileChange = (e) => {
    console.log(e);
    const file=e.target.files[0];
    setFile(file);
    console.log(file);
  };
  
  /**
   * Handles form submission for publishing news article.
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    setStatus("Published");
    e.preventDefault();
    console.log(file);
    await PostNews();
  };
  
  /**
   * Handles form submission for saving news article as draft.
   * @param {Object} e - Event object
   */
  const handleDraft = async (e) => {
    setStatus("Draft");
    e.preventDefault();
    await PostNews();
  };
  
  /**
   * Posts news article data to backend.
   */
  const PostNews = async () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const year = currentDate.getFullYear();

    // Format the date as desired (e.g., "DD/MM/YYYY")
    const date2 = `${day}/${month}/${year}`;
    console.log(date2);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("file", file);
    console.log(file);
    formData.append("status", status);
    formData.append("date", date2);
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  
  /**
   * Callback function for successful response.
   * @param {Object} result - Result object
   */
  const successCallBack=(result)=>{
    console.log(result);
  }
  
  /**
   * Callback function for failure response.
   * @param {Object} err - Error object
   */
  const failureCallBack=(err)=>{
    console.log(err);
  }
  
  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Create News Feed</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Title</label>
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">Content</label>
            <textarea
              className="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">Category</label>
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">Upload Image or Video</label>
            <input
              className="file-input"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Publish</button>
          <button onClick={handleDraft}>Save as Draft</button>
        </form>
      </div>
      <div className="mobile-preview-container">
        <div className="mobile-preview">
          <SanityMobilePreview>
            <div className="mobile-scrollable-div">
              <p className="preview-category">{category}</p>
              <h4 className="preview-title">{title}</h4>
              {file ? (
                file.type.startsWith("image/") ? (
                  <img
                    className="preview-image"
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                  />
                ) : file.type.startsWith("video/") ? (
                  <video className="preview-video" controls>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p>File type not supported for preview.</p>
                )
              ) : (
                <p>No file</p>
              )}
              <p className="preview-content">{content}</p>
            </div>
          </SanityMobilePreview>
        </div>
      </div>
    </div>
  );
};
export default CreateNewsFeed;
