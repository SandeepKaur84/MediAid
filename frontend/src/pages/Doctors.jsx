// src/pages/AllDoctors.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors, specialityData } from "../assets/assets";
import DoctorCard from "../components/DoctorCard";

const Doctors = () => {
  const { speciality } = useParams(); // read URL param e.g. "/doctors/dermatologist"
  const navigate = useNavigate();

  // Filter logic: if speciality param exists, filter by it
  const filteredDoctors = speciality
    ? doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      )
    : doctors;

  // Smooth scroll to top when speciality changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [speciality]);

  return (
    <section className="py-16 px-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Browse Through Our Doctors
      </h2>

      <div className="flex gap-10 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-1/5 bg-white p-5 rounded-2xl shadow-md h-fit sticky top-20">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Specialities
          </h3>
          <ul className="space-y-3">
            <li
              onClick={() => navigate("/doctors")}
              className={`cursor-pointer px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100 ${
                !speciality ? "bg-blue-200 font-medium" : ""
              }`}
            >
              All
            </li>
            {specialityData.map((sp) => (
              <li
                key={sp.speciality}
                onClick={() =>
                  navigate(`/doctors/${sp.speciality.toLowerCase()}`)
                }
                className={`cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 ${
                  speciality?.toLowerCase() === sp.speciality.toLowerCase()
                    ? "bg-blue-200 font-medium"
                    : "text-gray-700"
                }`}
              >
                {sp.speciality}
              </li>
            ))}
          </ul>
        </aside>

        {/* Doctors Display */}
        <div className="flex-1">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {filteredDoctors.map((doc) => (
                <DoctorCard
                  key={doc._id}
                  _id={doc._id}
                  image={doc.image}
                  name={doc.name}
                  speciality={doc.speciality}
                  degree={doc.degree}
                  experience={doc.experience}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No doctors available for this speciality.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
