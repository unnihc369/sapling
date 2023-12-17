import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";

const Farm = ({value}) => {
  
  const data = value.el.data();
 

  const handleAddToBag = () => {
    value.whichFarm(value.el)
  };
  

  return (
    <div className="bg-white">
      {value && (
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:col-span-1 lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-visible rounded-lg">
                <img
                  src={data.images.imageUrl}
                  alt="Farmer"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="lg:col-start-2 lg:border-l lg:border-gray-200 lg:pl-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {data.farmerName}'s Farm
              </h1>

              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Farmer ID:</span> {data.farmerId}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Farm Size:</span> {data.farmSize}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Water Supply:</span>{" "}
                  {data.WaterSupply}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Address:</span> {data.addres}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Equipments:</span>{" "}
                  {data.equipments}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Crops Grown Earlier:</span>{" "}
                  {data.CropsGrowthEarlier}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Revenue:</span> {data.revenue}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Type of Soil:</span>{" "}
                  {data.typeOfSoil}
                </p>
              </div>

              <form className="mt-10">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{backgroundColor:"blue"}}
                  onClick={handleAddToBag}
                >
                  Contact Us
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Farm;
