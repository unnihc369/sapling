import React, { useState } from "react";

const Blog = () => {
  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [comments, setComments] = useState([
    { author: "Alice", content: "Great post!", date: "December 21, 2023" },
    { author: "Bob", content: "I learned a lot!", date: "December 22, 2023" },
  ]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // Add the new comment to the comments array
    const newComment = {
      author: "New Commenter", // You can replace with the actual author
      content: commentContent,
      date: new Date().toLocaleDateString(),
    };

    setComments([...comments, newComment]);

    // Clear the form fields
    setCommentTitle("");
    setCommentContent("");
    setCommentImage("");
  };

  const blogPost = {
    title: "Lorem Ipsum: A Brief Introduction",
    author: "John Doe",
    imageUrl: "https://via.placeholder.com/800x400", // Replace with your actual image URL
    postedDate: "December 20, 2023",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lectus eget odio laoreet varius at quis libero. 
      Curabitur scelerisque urna vel urna posuere, id ullamcorper leo lacinia. Proin efficitur scelerisque sapien, 
      et varius turpis viverra id. Morbi et lacinia nisl. Phasellus tristique convallis luctus. In hac habitasse 
      platea dictumst. Proin imperdiet sapien in justo congue, nec fermentum sem eleifend. Integer laoreet bibendum 
      ipsum, vel malesuada nunc dignissim vel. Sed non quam in quam gravida commodo ac vitae tortor.
    `,
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <article className="prose lg:prose-xl">
          <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
          <div className="flex items-center mb-6">
            <img
              src={blogPost.imageUrl}
              alt="Blog Post"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <p className="text-gray-600">{blogPost.author}</p>
              <p className="text-gray-500">{blogPost.postedDate}</p>
            </div>
          </div>
          <img
            src={blogPost.imageUrl}
            alt="Blog Post"
            className="mb-8 w-full h-64 object-cover rounded-lg"
          />
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />

          {/* Display Comments */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.map((comment, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-600">{comment.author}</p>
                <p className="text-gray-500">{comment.date}</p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mt-8 p-4 bg-gray-100 rounded">
            <div className="mb-4">
              <label
                htmlFor="commentTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Comment Title
              </label>
              <input
                type="text"
                id="commentTitle"
                value={commentTitle}
                onChange={(e) => setCommentTitle(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="commentContent"
                className="block text-sm font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                id="commentContent"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="commentImage"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL (optional)
              </label>
              <input
                type="text"
                id="commentImage"
                value={commentImage}
                onChange={(e) => setCommentImage(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Comment
            </button>
          </form>
        </article>
      </div>
    </div>
  );
};

export default Blog;
