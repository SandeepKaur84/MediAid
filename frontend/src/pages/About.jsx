import React from "react";
import { HeartPulse, Users2, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🌈 Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-20 px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-yellow-300">MediAid+</span></h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
          Your trusted partner in making healthcare accessible, simple, and connected — anytime, anywhere.
        </p>
      </section>

      {/* 💡 About Content */}
      <section className="py-16 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">Who We Are</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-600">MediCare+</span>, we believe that managing your health
            should be as simple as booking a ticket. Our platform connects patients with trusted doctors, enabling
            fast, secure, and stress-free appointment scheduling.
          </p>
        </div>

        {/* 🧩 Core Values Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center mb-4">
              <HeartPulse className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To simplify healthcare access and empower patients to manage appointments with ease, trust, and confidence.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center mb-4">
              <Users2 className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To create a world where every patient can connect with the right doctor in just a few clicks.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Our Values</h3>
            <p className="text-gray-600">
              Transparency, trust, and technology — building a bridge between care and convenience for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ❤️ Closing Section */}
      <section className="bg-white py-12 text-center border-t">
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          At <span className="font-semibold text-blue-600">MediAid+</span>, we are redefining how people connect with
          healthcare professionals — one click at a time.
        </p>
      </section>
    </div>
  );
};

export default About;
