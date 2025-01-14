import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Home } from './pages/Home';
import { FeedPage } from './pages/FeedPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">WorldMart</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<FeedPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;