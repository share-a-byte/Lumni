import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { LuUniversity } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";

export default function Profile() {
  const userProfile = {
    name: "Sarah Chen",
    role: "Student",
    instagram: "sarahchen",
    university: "Stanford University",
    email: "sarah.chen@example.com",
    linkedin: "https://linkedin.com/in/sarahchen",
    bio: "Passionate about creating intuitive user experiences and solving complex design problems.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const pastEvents = [
    { name: "X Tech Meetup", date: "January 12, 2024", attendees: 45 },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-32"></div>
          <div className="px-6 py-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="-mt-16 relative">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="h-24 w-24 rounded-full ring-4 ring-white shadow-lg"
                  />
                </div>
                <div className="mt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userProfile.name}
                  </h1>
                  <p className="text-sm text-gray-600">{userProfile.role}</p>
                  <p className="text-sm text-gray-600">
                    {userProfile.university}
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-600">
                <p className="mb-4">{userProfile.bio}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <BsInstagram className="h-5 w-5 text-pink-400 mr-2" />
                    <Link
                      href={`https://www.instagram.com/${userProfile.instagram}`}
                    >
                      @{userProfile.instagram}
                    </Link>
                  </div>

                  <div className="flex items-center">
                    <LuUniversity className="h-5 w-5 text-blue-400 mr-2" />
                    {userProfile.university}
                  </div>

                  <div className="flex items-center">
                    <TfiEmail className="h-5 w-5 text-purple-600 mr-2" />
                    <Link href={userProfile.email}>{userProfile.email}</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Events */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Past Events</h2>
              <div className="mt-4 space-y-4">
                {pastEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {event.name}
                        </h3>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {event.attendees} attendees
                      </span>
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
