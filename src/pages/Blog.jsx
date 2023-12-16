import React from "react";

const Blog = () => {
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
        </article>
      </div>
    </div>
  );
};

export default Blog;
