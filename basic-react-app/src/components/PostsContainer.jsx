import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

function PostsContainer() {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    const res = await fetch("http://posts.com/posts");
    const allPosts = await res.json();
    setPosts(allPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <h1>Posts container</h1>

      <CreatePost />

      <h2>Posts</h2>
      {Object.values(posts).map(post => {
        return <Post key={post.id} content={post.content}/>
      }) }
    </div>
  );
}

export default PostsContainer;
