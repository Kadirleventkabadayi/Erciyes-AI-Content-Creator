"use client";
import HomeSkeleton from "@/components/skeleton/HomeSkeleton";
import MiniDrawer from "../components/drawer/MiniDrawer";
import { Button, Grid } from "@mui/material";
import CustomCard from "@/components/card/CustomCard";
import React, { useState } from "react";
import { getPosts } from "@/lib/utils";
import { Post } from "@/lib/types";

export default function HomePage() {
  const [postDatas, setPostDatas] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    try {
      const fetchedPost = await getPosts();
      setPostDatas((prev) => [...prev, fetchedPost]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    console.log("click");
    fetchPosts();
  };

  return (
    <MiniDrawer>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{ marginBottom: 2 }}
      >
        OLUŞTUR
      </Button>

      {loading ? (
        <HomeSkeleton />
      ) : (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={5} mb={2}>
            <CustomCard
              platform="instagram"
              postImage="/Gradient.png"
              title={postDatas[0].post.title}
              content={postDatas[0].post.body}
              hashtags={["tag3", "tag4"]}
              likes={20}
              comments={8}
              date="2024-10-28T15:00:00Z"
            />
          </Grid>

          <Grid container spacing={2}>
            {postDatas.slice(1).map((post, index) => (
              <Grid item xs={6} sm={4} md={4} key={index}>
                <CustomCard
                  platform="instagram"
                  postImage="/Gradient.png"
                  title={post.post.title}
                  content={post.post.body}
                  hashtags={["tag3", "tag4"]}
                  likes={20}
                  comments={8}
                  date="2024-10-28T15:00:00Z"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </MiniDrawer>
  );
}
