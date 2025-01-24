import { Link } from 'react-router-dom';
import { Globe, Search, Users, TrendingUp, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          <Globe className="w-20 h-20 text-blue-600" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to WorldMart
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your global marketplace for B2B trade. Connect with verified suppliers and discover quality products.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/feed"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            Explore Products
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="bg-white text-gray-700 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        <div className="text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Find Products</h3>
          <p className="text-gray-600">Search and discover products from verified suppliers worldwide</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <p className="text-gray-600">Build relationships with reliable suppliers and buyers</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Grow</h3>
          <p className="text-gray-600">Expand your business with global trade opportunities</p>
        </div>
      </div>
    </div>
  );
}