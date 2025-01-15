"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { BiKey } from "react-icons/bi";

export default function Home() {
  const [code, setCode] = useState("");

  const handleAccessCodeSubmit = async () => {
    // Validate the access code (optional, depending on your requirements)
    if (code === "imc_witt") {
      event?.preventDefault();
      redirect("/entry");
    } else {
      alert("Invalid access code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-indigo-200 rounded-full flex items-center justify-center shadow-lg">
            <BiKey className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Join your group
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter the group code provided by your event organizer
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-4 space-y-6" onSubmit={handleAccessCodeSubmit}>
          <div className="flex flex-col items-center space-y-4 text-black">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full text-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center tracking-widest shadow-sm"
              placeholder="Enter your code"
            />
            <button
              type="submit"
              className="w-full py-2 px-6 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
