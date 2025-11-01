// src/components/TopDoctors.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets";

const TopDoctors = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
      {doctors.slice(0, 6).map((doctor) => (
        <div
          key={doctor._id}
          onClick={() => navigate(`/doctor/${doctor._id}`)}
          className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-full max-w-xs border border-gray-100 overflow-hidden"
        >
          {/* Image */}
          <div className="w-full h-52 overflow-hidden">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="p-5 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor.name}
            </h3>
            <p className="text-[#3949AB] font-medium text-sm mt-1">
              {doctor.speciality}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopDoctors;
