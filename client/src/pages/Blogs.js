import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";

const Blogs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [blogs, setBlogs] = useState([]);

  // get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Box padding={isMobile ? 4 : 8}>
      <Grid container spacing={isMobile ? 4 : 8}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} lg={30} key={blog?._id}>
            <BlogCard
              id={blog?._id}
              isUser={localStorage.getItem("userId") === blog?.user?._id}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={blog?.user?.username}
              time={blog.createdAt}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blogs;
