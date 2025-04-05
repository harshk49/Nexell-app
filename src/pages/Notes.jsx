import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Notes = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#111] text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center">
          <button
            onClick={goBack}
            className="p-2 mr-4 rounded-full hover:bg-black/30"
          >
            <ArrowLeft className="text-[#A3F600]" />
          </button>
          <h1 className="text-3xl font-bold text-[#A3F600]">Notes</h1>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="max-w-6xl mx-auto">
        <div className="p-12 text-center bg-black border border-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold text-[#A3F600] mb-4">Coming Soon</h2>
          <p className="mb-4 text-gray-400">
            The Notes feature is currently under development and will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notes;