// UserPosts.js

import React from "react";

const UserPosts = () => {
  // Replace this with actual user data
  const user = {
    posts: [
      { id: 1, content: "Post 1" },
      { id: 2, content: "Post 2" },
      // Add more posts as needed
    ],
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <ul>
        {user.posts.map((post) => (
          <li key={post.id} className="mb-2">
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
