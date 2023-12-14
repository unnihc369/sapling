// src/components/Profile.js
import React from "react";

const Profile = () => {
  const callouts = [
    {
      name: "Desk and Office",
      description: "Work from home accessories",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      imageAlt:
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: "#",
    },
    {
      name: "Self-Improvement",
      description: "Journals and note-taking",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
      imageAlt:
        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: "#",
    },
    {
      name: "Travel",
      description: "Daily commute essentials",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
      imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
      href: "#",
    },
  ];
  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="mb-4 lg:mb-0 lg:mr-8 bg-gray-200 p-8 rounded-full">
          <img
            src=""
            alt="Profile"
            className="rounded-full h-20 w-20 object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-gray-600 mb-2">@johndoe</p>
          <p className="text-gray-600 mb-2">johndoe@email.com</p>
          <p className="text-gray-600 mb-2">123-456-7890</p>
        </div>
      </div>

      <div className="m-4">
        <h2 className="text-2xl font-bold">Followers</h2>
        <p className="text-gray-600">Followed by 500 people</p>
        {/* Display followers */}
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl py-6 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;