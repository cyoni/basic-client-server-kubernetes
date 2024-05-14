import React, { useState } from "react";

function CreatePost() {
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // make post request to server
    await fetch("http://posts.com/posts/create", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ content }),
    });

    setContent("");
  };

  return (
    <div>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input
              id="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
