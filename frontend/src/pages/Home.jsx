import React from "react";
import { Link, useNavigate } from "react-router-dom";
import headerImg from "../assets/header_img.png";
import TopDoctors from "../components/TopDoctors";
import { specialityData } from "../assets/assets";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* 🌟 Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[90vh] px-8 md:px-20 gap-12 bg-gradient-to-r from-[#E8ECFF] via-[#EEF0FF] to-[#F8FAFF]">
        {/* Text Content */}
        <div className="max-w-xl text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#2A3CAD] drop-shadow-sm">
            Your Health, Our Priority
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Connect instantly with top doctors near you. Book appointments,
            track your health, and access trusted care—all in one place.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-6">
            <Link
              to="/doctors"
              className="bg-[#2A3CAD] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#1F2D90] transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center w-full md:w-[45%]">
          <img
            src={headerImg}
            alt="Doctor illustration"
            className="w-[85%] md:w-[80%] lg:w-[75%] rounded-2xl drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </section>

      {/* 🔍 Find by Speciality Section */}
      <section
        id="speciality"
        className="py-24 px-8 md:px-20 bg-gradient-to-b from-[#F6F8FF] to-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A3CAD] mb-14">
            Find by Speciality
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 justify-items-center">
            {specialityData.slice(0, 6).map((sp) => (
              <div
                key={sp.speciality}
                onClick={() => navigate(`/doctors/${sp.speciality.toLowerCase()}`)}
                className="group flex flex-col items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg p-8 w-40 h-40 cursor-pointer transition-all duration-300 hover:-translate-y-2 border border-gray-200"
              >
                <div className="bg-[#EEF1FF] p-4 rounded-full mb-4">
                  <img
                    src={sp.image}
                    alt={sp.speciality}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <p className="text-base font-semibold text-gray-700 text-center">
                  {sp.speciality}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🩺 Top Doctors Section */}
      <section id="doctors" className="py-20 px-8 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2A3CAD] mb-12">
            Our Top Doctors
          </h2>
          <TopDoctors />
        </div>
      </section>

      {/* 🚀 Call-to-Action Banner */}
      <section className="bg-gradient-to-r from-[#2A3CAD] to-[#5C6FFF] text-white py-16 px-8 md:px-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Join MediAid today and experience seamless online doctor
            appointments, secure health records, and personalized care—all at
            your fingertips.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
