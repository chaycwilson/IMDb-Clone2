import { FaFilm, FaServer, FaCode, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-10"></div>
        <div className="relative py-12 px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">About Our Movie Database</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform built with Next.js and TMDB API, bringing you the latest and greatest in cinema
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <FeatureCard 
          icon={<FaFilm className="text-4xl text-yellow-500" />}
          title="Extensive Movie Collection"
          description="Access thousands of movies from classics to the latest releases, complete with ratings, descriptions, and images."
        />
        <FeatureCard 
          icon={<FaServer className="text-4xl text-blue-500" />}
          title="Powered by TMDB"
          description="Leveraging the extensive data from The Movie Database (TMDB) API to provide accurate and up-to-date information."
        />
        <FeatureCard 
          icon={<FaCode className="text-4xl text-green-500" />}
          title="Modern Tech Stack"
          description="Built with Next.js, React, and Tailwind CSS for a fast, responsive, and beautiful user experience."
        />
      </div>

      {/* Mission Section */}
      <div className="bg-gray-100 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
          We believe that everyone deserves access to comprehensive film information. Our mission is to create a user-friendly platform that helps movie enthusiasts discover, explore, and enjoy cinema from around the world. By combining cutting-edge technology with the extensive TMDB database, we aim to provide the most accurate and up-to-date film information available.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Data Integration</h3>
            <p className="mb-4 text-gray-700">
              We seamlessly integrate with the TMDB API to fetch movie data, including titles, descriptions, ratings, and images. This integration ensures that our database stays current with the latest releases and ratings.
            </p>
            <p className="text-gray-700">
              Our advanced search functionality allows you to find movies by title, actor, director, or genre, making it easy to discover new films or locate old favorites.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">User Experience</h3>
            <p className="mb-4 text-gray-700">
              Built with Next.js and React, our platform delivers a fast, responsive user interface that works on any device. The use of server-side rendering and static generation ensures optimal performance.
            </p>
            <p className="text-gray-700">
              Tailwind CSS provides a clean, modern design that makes browsing and discovering movies a pleasure. Our carefully crafted UI emphasizes readability and accessibility.
            </p>
          </div>
        </div>
      </div>

      {/* Team/Contact Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
        <div className="flex justify-center space-x-6 mb-8">
          <SocialLink href="#" icon={<FaGithub />} name="GitHub" />
          <SocialLink href="#" icon={<FaLinkedin />} name="LinkedIn" />
          <SocialLink href="#" icon={<FaTwitter />} name="Twitter" />
        </div>
        <p className="text-gray-600">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <p className="text-gray-600">
          Email us at: <a href="mailto:contact@moviedb-example.com" className="text-blue-500 hover:underline">contact@moviedb-example.com</a>
        </p>
      </div>
    </div>
  );
}

// Helper Components
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function SocialLink({ href, icon, name }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
      aria-label={name}
    >
      {icon}
    </a>
  );
}