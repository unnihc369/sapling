// UserInfo.js

import React from "react";

const UserInfo = () => {
  // Replace these with actual user data
  const user = {
    name: "John Doe",
    address: "123 Main St, City",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    posts: [
      { id: 1, content: "Post 1" },
      { id: 2, content: "Post 2" },
      // Add more posts as needed
    ],
    followers: 100, // Replace with the actual number of followers
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-4">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="text-gray-600 mb-2">{user.address}</p>
      <p className="text-gray-600 mb-2">{user.email}</p>
      <p className="text-gray-600 mb-2">{user.phoneNumber}</p>
      <div className="flex items-center">
        <p className="mr-2">{user.posts.length} Posts</p>
        <p>{user.followers} Followers</p>
      </div>
    </div>
  );
};

export default UserInfo;
