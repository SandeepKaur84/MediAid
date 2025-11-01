import React, { useEffect, useState } from "react";
import axios from "../api/api";
import { UserCircle2, Edit3, Save, X } from "lucide-react";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put("/users/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setFormData(res.data.user);
      setIsEditing(false);
      setMessage("✅ Profile updated successfully!");
    } catch (error) {
      setMessage("❌ Failed to update profile.");
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3949AB] to-indigo-600 p-6 text-center text-white">
        <UserCircle2 className="mx-auto w-20 h-20 mb-3 text-white opacity-90" />
        <h2 className="text-2xl font-semibold">{user.fullName}</h2>
        <p className="text-sm text-blue-100">{user.email}</p>
      </div>

      {/* Content */}
      <div className="p-6 bg-gray-50">
        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-3 border rounded-lg transition ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              value={formData.email || ""}
              disabled
              className="w-full mt-1 p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-600 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-3 border rounded-lg transition ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-3 border rounded-lg ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label className="block text-gray-600 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-3 border rounded-lg transition ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="block text-gray-600 font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              disabled={!isEditing}
              rows="2"
              className={`w-full mt-1 p-3 border rounded-lg transition ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-300"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-[#3949AB] text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              <Edit3 size={18} /> Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(user);
                }}
                className="flex items-center gap-2 bg-gray-400 text-white px-5 py-2.5 rounded-lg hover:bg-gray-500 transition"
              >
                <X size={18} /> Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
