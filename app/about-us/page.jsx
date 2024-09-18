"use client";
import React from "react";
import {
  FaRegLightbulb,
  FaHeart,
  FaHandsHelping,
  FaRocket,
  FaRegSmileBeam,
  FaHandshake,
  FaSearch,
  FaUpload,
} from "react-icons/fa"; // Icons for last section
import { FaRegFaceSmileBeam } from "react-icons/fa6";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 1st Row: Full-width image with centered heading */}
      <div className="relative w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-5xl font-bold text-white">About Us</h1>
        </div>
      </div>

      {/* 2nd Row: 2 Columns - Text on the left, Image on the right */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 px-4 lg:px-0">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-black mb-4">Our Story</h2>
          <p className="text-lg text-gray-700">
            Praesent metus tellus, elementum eu, semper a, adipiscing nec,
            purus. Vestibulum volutpat pretium libero. In ut quam vitae odio
            lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam.
            Aenean massa. In dui magna, posuere eget, vestibulum et, tempor
            auctor, justo. Vivamus consectetuer hendrerit lacus. In hac
            habitasse platea dictumst. Ut tincidunt tincidunt erat. Lorem ipsum
            dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1483181994834-aba9fd1e251a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our journey image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* 3rd Row: 2 Columns - Image on the left, Text on the right */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 px-4 lg:px-0">
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our vision image"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-black mb-4">Who We Are ?</h2>
          <p className="text-lg text-gray-700">
            Praesent metus tellus, elementum eu, semper a, adipiscing nec,
            purus. Vestibulum volutpat pretium libero. In ut quam vitae odio
            lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam.
            Aenean massa. In dui magna, posuere eget, vestibulum et, tempor
            auctor, justo. Vivamus consectetuer hendrerit lacus. In hac
            habitasse platea dictumst. Ut tincidunt tincidunt erat. Lorem ipsum
            dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>
      </div>

      {/* 4th Row: Full-width image with left-aligned text */}
      <div className="relative w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1681498420366-97101c146d7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        <div className="absolute inset-0 flex items-start justify-start px-8 lg:px-32 py-16 bg-black bg-opacity-50">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-4">
              Behind The Brands
            </h2>
            <p className="text-lg text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>

      {/* 5th Row: Heading with 3 Images Layout */}
      <div className="container mx-auto py-12 px-4 lg:px-0">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">
          Exchange Any types of handbags
        </h2>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Quisque vitae nibh iaculis neque blandit hendrerit euismod.Maecenas
          sit amet purus eget ipsum elementum venenatis. Aenean maximus urna
          magna, quis rutrum mi semper non. Cras rhoncus elit non arcu hendrerit
          rhoncus sit amet purus eget ipsum.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1490427712608-588e68359dbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team member large image"
              className="rounded-lg shadow-lg h-[800px] w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <img
              src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team member small image 1"
              className="rounded-lg shadow-lg h-[390px] w-full object-cover"
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1683141216727-79ef748bd463?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team member small image 2"
              className="rounded-lg shadow-lg h-[390px] w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 6th Row: Icons and commitment statement */}
      <div className="bg-[#F5BA41] py-16 px-4 lg:px-0">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <FaRegLightbulb className="text-6xl text-[#F5BA41]" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-black mb-6">
            We’re Committed to Creating the Change We Want to See in the World
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <FaUpload className="text-4xl text-white" />,
                title: "Innovation",
                description: "Upload your own product photo",
              },
              {
                icon: <FaSearch className="text-4xl text-white" />,
                title: "Compassion",
                description:
                  "You can also filter by what you want and you can really make the trade happen!",
              },
              {
                icon: <FaHandshake className="text-4xl text-white" />,
                title: "Collaboration",
                description:
                  "Our platform allows you to trade within the same tier amount and the category",
              },
              {
                icon: <FaRegFaceSmileBeam className="text-4xl text-white" />,
                title: "Growth",
                description:
                  "Once you accept a ‘received’ trade, or a trade you ‘sent’ is accepted by someone else, that’s a trade made!",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-black p-6 rounded-lg shadow-lg"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
