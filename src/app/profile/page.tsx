"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { LuUniversity } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";

interface Event {
  name: string;
  date: string;
  attendees: number;
}

interface Attendee {
  id: string;
  full_name: string;
  email: string;
  university: string;
  instagram?: string;
  linkedin_url?: string;
}

// Wrapper component that includes the Suspense boundary
export default function ProfileWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}

// Main profile component
function ProfileContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Rest of your component code remains the same...
  useEffect(() => {
    async function fetchAttendee() {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase
          .from("attendees")
          .select("*")
          .eq("id", id)
          .single();

        console.log(data);

        if (error) throw error;
        setAttendee(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAttendee();
  }, [id]);

  const pastEvents: Event[] = [
    { name: "X Tech Meetup", date: "January 12, 2024", attendees: 45 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !attendee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <h2 className="text-xl font-bold">Profile not found</h2>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all hover:shadow-2xl">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-32 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="h-24 w-24 rounded-full ring-4 ring-white shadow-lg bg-gray-200 flex items-center justify-center text-gray-600 text-3xl font-bold">
                {attendee.full_name[0]}
              </div>
            </div>
          </div>

          <div className="px-8 pt-16 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {attendee.full_name}
                </h1>
                <p className="text-gray-600 mt-1">{attendee.university}</p>
                <p className="text-gray-500 text-sm">Student</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                Edit Profile
              </button>
            </div>

            {/* Contact Information */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {attendee.instagram && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <BsInstagram className="h-5 w-5 text-pink-500" />
                  <Link
                    href={`https://www.instagram.com/${attendee.instagram}`}
                    className="text-gray-700 hover:text-pink-500 transition-colors"
                  >
                    @{attendee.instagram}
                  </Link>
                </div>
              )}
              {attendee.university && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <LuUniversity className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">{attendee.university}</span>
                </div>
              )}
              {attendee.email && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <TfiEmail className="h-5 w-5 text-purple-500" />
                  <Link
                    href={`mailto:${attendee.email}`}
                    className="text-gray-700 hover:text-purple-500 transition-colors"
                  >
                    {attendee.email}
                  </Link>
                </div>
              )}
              {attendee.linkedin_url && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <Link
                    href={attendee.linkedin_url}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    LinkedIn Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Past Events */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Past Events
              </h2>
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {event.name}
                        </h3>
                        <p className="text-gray-500 mt-1">{event.date}</p>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-full shadow-sm">
                        <span className="text-gray-600">
                          {event.attendees} attendees
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
