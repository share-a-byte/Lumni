"use client";

import { Tab } from "@headlessui/react";
import {
  UsersIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Event() {
  const eventDetails = {
    name: "Women in Trading & Technology",
    date: "January 13-15, 2025",
    location: "IMC Headquarters, Chicago",
    attendeeCount: 30,
    description:
      "A three-day immersive program at IMC exploring trading, technology, and career opportunities.",
  };

  const panelists = [
    {
      name: "Vera Yan",
      role: "Software Engineer",
      topic: "Q & A",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Quick bio...",
    },
    {
      name: "Molly O'Brien",
      role: "Quant Trader",
      topic: "Q & A",
      // avatar:
      //   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Quick bio...",
    },
  ];

  const agenda = {
    day1: [
      { time: "8:15 - 8:45 AM", title: "Breakfast" },
      { time: "8:45 - 9:25 AM", title: "Welcome to WiTT" },
      { time: "9:30 - 10:15 AM", title: "Intro to IMC" },
      { time: "10:15 - 10:25 AM", title: "Break" },
      { time: "10:25 - 11:10 AM", title: "Intro to Technology" },
    ],
    day2: [
      { time: "8:15 - 8:45 AM", title: "Breakfast" },
      { time: "9:00 - 10:00 AM", title: "AmplifyMe Session 1: Research" },
      { time: "10:00 - 10:15 AM", title: "Break" },
      { time: "10:15 - 10:30 AM", title: "Intro to IMC Giving" },
    ],
    day3: [
      { time: "8:00 - 8:15 AM", title: "Grab & Go Breakfast" },
      { time: "8:15 - 8:50 AM", title: "IMC Internship Overview" },
      { time: "8:50 - 9:00 AM", title: "Break" },
      { time: "9:00 - 10:00 AM", title: "Past Intern Project Demos" },
    ],
  };

  const attendees = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      company: "Designworks",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Alex Kim",
      role: "UX Researcher",
      company: "TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Event Header */}
      <div className="relative h-[45vh] bg-gradient-to-br from-indigo-600 to-purple-700 text-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-gray-900 h-32" />
        <div className="relative h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-4">{eventDetails.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-200">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {eventDetails.date}
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2" />
              {eventDetails.location}
            </div>
            <div className="flex items-center">
              <UsersIcon className="h-5 w-5 mr-2" />
              {eventDetails.attendeeCount} Attendees
            </div>
          </div>
          <p className="text-xl text-gray-300 mt-6">
            {eventDetails.description}
          </p>
        </div>
      </div>

      {/* Featured Panelists */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Panelists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {panelists.map((panelist, index) => (
            <div
              key={index}
              className="relative bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <span className="absolute -top-5 right-2 mt-2 block bg-indigo-700 text-sm px-3 py-1 rounded-full">
                {panelist.topic}
              </span>
              <div className="flex items-start space-x-4">
                {panelist.avatar ? (
                  <img
                    src={panelist.avatar}
                    alt={panelist.name}
                    className="h-16 w-16 rounded-full"
                  />
                ) : (
                  <></>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{panelist.name}</h3>
                  <p className="text-gray-400">{panelist.role}</p>
                  <p className="text-gray-300 mt-2">{panelist.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agenda */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold mb-6">Program Schedule</h2>
        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-lg p-2">
            {Object.keys(agenda).map((day, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `py-2 px-4 text-sm font-medium rounded-lg ${
                    selected
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`
                }
              >
                {day.replace("day", "Day ")}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {Object.values(agenda).map((dayAgenda, index) => (
              <Tab.Panel key={index} className="mt-4">
                {dayAgenda.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-2"
                  >
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-indigo-400 mr-2" />
                      <span>{item.time}</span>
                    </div>
                    <span>{item.title}</span>
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Attendees */}
      <div className="max-w-7xl mx-auto px-6 mt-12 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Attendees</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {attendees.map((attendee, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4"
            >
              <img
                src={attendee.avatar}
                alt={attendee.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="text-lg">{attendee.name}</h3>
                <p className="text-sm text-gray-400">{attendee.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
