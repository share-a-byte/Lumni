"use client";

import { useState } from "react";
import Image from "next/image";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import { LuUniversity } from "react-icons/lu";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [formError, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    email: "",
    linkedin: "",
    instagram: "",
    university: "",
    avatar: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = await createClient();
    try {
      // Handle profile update logic here
      if (!formData.fullName || !formData.university) {
        setError("Please fill in your name and university");
        return;
      }

      const { data, error } = await supabase
        .from("attendees")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            linkedin_url: formData.linkedin,
            instagram: formData.instagram,
            university: formData.university,
          },
        ])
        .select();

      if (!data || error) {
        setError("Error updating profile");
        return;
      }

      setLoading(false);
      window.location.href = "/event";
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Create your profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="backdrop-blur-lg bg-gray-800/50 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-700/50">
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gradient-to-br from-gray-700 to-gray-600 ring-4 ring-violet-500/30">
                {formData.avatar ? (
                  <Image
                    src={URL.createObjectURL(formData.avatar)}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <svg
                      className="h-16 w-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <label className="relative inline-flex items-center justify-center group">
                <span
                  className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 
                             transition-all duration-200 cursor-pointer text-sm font-medium"
                >
                  Upload Photo
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({ ...formData, avatar: file });
                  }}
                />
              </label>
            </div>

            {/* Profile Information Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full md:col-span-1">
                <input
                  type="text"
                  id="username"
                  className="required mt-1 block w-full rounded-lg bg-gray-700/50 border-transparent 
                           focus:border-violet-500 focus:ring-2 focus:ring-violet-500 
                           text-white px-4 py-3 transition-colors duration-200"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Your Name"
                />
              </div>

              <div className="col-span-full md:col-span-1">
                {/* <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label> */}
                <div className="mt-1 relative rounded-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdEmail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="block w-full pl-10 rounded-lg bg-gray-700/50 border-transparent 
                             focus:border-violet-500 focus:ring-2 focus:ring-violet-500 
                             text-white px-4 py-3 transition-colors duration-200"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              {/* University */}
              <div className="relative rounded-lg lg:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LuUniversity className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 rounded-lg bg-gray-700/50 border-transparent 
                               focus:border-violet-500 focus:ring-2 focus:ring-violet-500 
                               text-white px-4 py-3 transition-colors duration-200"
                  value={formData.university}
                  onChange={(e) =>
                    setFormData({ ...formData, university: e.target.value })
                  }
                  placeholder="University"
                />
              </div>

              {/* Social Links */}
              <div className="col-span-full">
                <h3 className="text-lg font-medium text-gray-200 mb-4">
                  Social Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LinkedIn */}
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLinkedin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 rounded-lg bg-gray-700/50 border-transparent 
                               focus:border-violet-500 focus:ring-2 focus:ring-violet-500 
                               text-white px-4 py-3 transition-colors duration-200"
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                      placeholder="LinkedIn URL"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaInstagram className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 rounded-lg bg-gray-700/50 border-transparent 
                               focus:border-violet-500 focus:ring-2 focus:ring-violet-500 
                               text-white px-4 py-3 transition-colors duration-200"
                      value={formData.instagram}
                      onChange={(e) =>
                        setFormData({ ...formData, instagram: e.target.value })
                      }
                      placeholder="Instagram"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <h3 className="text-lg font-medium text-gray-200 mb-2">Bio</h3>
                <textarea
                  id="bio"
                  rows={4}
                  className="mt-1 block w-full rounded-lg bg-gray-700/50 border-transparent 
                           focus:border-violet-500 focus:ring-2 focus:ring-violet-500 
                           text-white px-4 py-3 transition-colors duration-200"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Enter a bio if you'd like!"
                />
              </div>
            </div>
            {formError && (
              <p className="text-red-500 flex justify-center mt-4">
                {formError}
              </p>
            )}
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 
                         rounded-lg shadow-sm text-sm font-medium text-white 
                         bg-violet-600 hover:bg-violet-700 
                       "
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
