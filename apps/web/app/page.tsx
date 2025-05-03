"use client"

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import Head from "next/head";



export default function Home() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      <Head>
        <title>Medium - Where good ideas find you.</title>
        <meta name="description" content="A place to read, write, and deepen your understanding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="border-b border-gray-200 px-4 py-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">Medium</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-gray-900">Our story</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Membership</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Write</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Sign in</a>
            <a href="#" className="bg-black text-white rounded-full px-4 py-2 hover:bg-gray-800">
              Get started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4 pb-3">
              <a href="#" className="text-gray-700 hover:text-gray-900">Our story</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Membership</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Write</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Sign in</a>
              <a href="#" className="bg-black text-white rounded-full px-4 py-2 text-center hover:bg-gray-800">
                Get started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-24 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6">
              Human <br />
              stories &amp; ideas
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              A place to read, write, and deepen your understanding
            </p>
            <a href="#" className="inline-block bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800">
              Start reading
            </a>
          </div>
          <div className="w-full md:w-1/2">
            {/* <div className="relative h-72 md:h-96 lg:h-full">
              <div className="absolute top-0 right-0">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <div className="absolute top-0 right-0 w-full h-full bg-green-500 rounded-full opacity-90"></div>
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-12 w-64 h-64 md:w-80 md:h-80 bg-green-500 opacity-90">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-white opacity-70 transform rotate-12"></div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 right-1/3 transform rotate-45">
                <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-70">
                  <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="1" />
                  <line x1="0" y1="100" x2="100" y2="0" stroke="black" strokeWidth="1" />
                </svg>
              </div>
            </div> */}
            <div className="relative bg-red-300 h-[50vh] md:h-96 lg:h-full">
              <Image
                src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
                alt="Medium Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center text-sm text-gray-500 space-x-4">
            <a href="#" className="hover:text-gray-700 mb-2">Help</a>
            <a href="#" className="hover:text-gray-700 mb-2">Status</a>
            <a href="#" className="hover:text-gray-700 mb-2">About</a>
            <a href="#" className="hover:text-gray-700 mb-2">Careers</a>
            <a href="#" className="hover:text-gray-700 mb-2">Press</a>
            <a href="#" className="hover:text-gray-700 mb-2">Blog</a>
            <a href="#" className="hover:text-gray-700 mb-2">Privacy</a>
            <a href="#" className="hover:text-gray-700 mb-2">Rules</a>
            <a href="#" className="hover:text-gray-700 mb-2">Terms</a>
            <a href="#" className="hover:text-gray-700 mb-2">Text to speech</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
