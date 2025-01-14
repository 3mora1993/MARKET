import React from 'react';
import { Lightbulb } from 'lucide-react';

export function RecommendationPanel() {
  const recommendations = [
    {
      id: 1,
      title: 'Update Product Images',
      description: 'Products with multiple high-quality images receive 2.3x more inquiries.',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Optimize Product Descriptions',
      description: 'Add more technical specifications to improve search visibility.',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Expand Product Categories',
      description: 'Consider adding products in trending categories like sustainable packaging.',
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <h2 className="text-lg font-semibold">Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map(rec => (
          <div key={rec.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium mb-1">{rec.title}</h3>
              <p className="text-sm text-gray-600">{rec.description}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(rec.priority)}`}>
              {rec.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}