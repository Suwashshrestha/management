'use client';
import Link from 'next/link';
import { FaConciergeBell, FaUtensils, FaCoffee, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';


interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition duration-200">
      <div className="text-4xl text-brown-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-brown-600 to-brown-800 shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FaCoffee className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-semibold text-white">Shrestha Cafe</span>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-gray-200 px-3 py-2 transition-colors duration-200">
                Home
              </Link>
              <Link href="/menu" className="text-white hover:text-gray-200 px-3 py-2 transition-colors duration-200">
                Menu
              </Link>
              <Link href="/about" className="text-white hover:text-gray-200 px-3 py-2 transition-colors duration-200">
                About
              </Link>
              <Link href="/login" className="text-white hover:text-gray-200 px-3 py-2 transition-colors duration-200">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-brown-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          </div>
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block text-white hover:bg-brown-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block text-white hover:bg-brown-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="block text-white hover:bg-brown-700 px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                href="/login"
                className="block text-white hover:bg-brown-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block text-white hover:bg-brown-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/cafe-hero-2.jpeg"
            alt="Shrestha Cafe"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-1 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Shrestha Cafe</h1>
          <p className="text-xl md:text-2xl mb-8">Experience the perfect blend of taste and tradition</p>
          <Link
            href="/menu"
            className="bg-brown-600 text-white px-8 py-3 rounded-full text-lg hover:bg-brown-700 transition-colors duration-200"
          >
            View Menu
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaCoffee />}
              title="Premium Coffee"
              description="Sourced from the finest coffee beans"
            />
            <FeatureCard
              icon={<FaUtensils />}
              title="Fresh Pastries"
              description="Baked fresh daily in-house"
            />
            <FeatureCard
              icon={<FaConciergeBell />}
              title="Fast Service"
              description="Quick and efficient ordering"
            />
            <FeatureCard
              icon={<FaUser />}
              title="Loyalty Program"
              description="Rewards for our regular customers"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

