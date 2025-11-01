// src/components/DoctorCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ _id, image, name, speciality }) => {
  return (
    <Link
      to={`/doctor/${_id}`}
      className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 w-full max-w-xs overflow-hidden border border-blue-100 hover:-translate-y-1 block"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-blue-600 font-medium text-sm">{speciality}</p>
      </div>
    </Link>
  );
};

export default DoctorCard;
