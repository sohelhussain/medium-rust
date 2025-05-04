"use client"

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Home() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/');
  }

  return (
    <div className="min-h-screen  bg-[#ffffff]">
      <Head>
        <title>Medium - Where good ideas find you.</title>
        <meta name="description" content="A place to read, write, and deepen your understanding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="border-b border-gray-200 px-4 py-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div onClick={handleNavigation} className="flex-shrink-0 cursor-pointer">
            <h1 className="text-2xl font-bold">Medium</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-gray-700 hover:text-gray-900">Our story</Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900">Membership</Link>
            <Link href="/create-article" className="bg-black text-white rounded-full px-4 py-2 hover:bg-gray-800">
              Write now
            </Link>
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
              <Link href="#" className="text-gray-700 hover:text-gray-900">Our story</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">Membership</Link>
              <Link href="/create-article" className="bg-black text-white rounded-full px-4 py-2 text-center hover:bg-gray-800">
                Write now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-24 md:px-12 lg:px-24 max-w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6">
              Human <br />
              stories &amp; ideas
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              A place to read, write, and deepen your understanding
            </p>
            <Link href="/readhome" className="inline-block bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800">
              Start reading
            </Link>
          </div>
          <div className="w-full flex justify-end h-[50vh] md:w-1/2">
            <div className="relative h-[50vh] md:h-96 lg:h-full">
              <div className="h-96 w-96">
              <Image
                fill
                src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
                alt="Medium Logo"
                className="object-cover h-1/2 w-1/2"
                />
                </div>
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
