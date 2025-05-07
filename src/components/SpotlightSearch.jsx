import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SpotlightSearch = ({ 
  isOpen, 
  onClose, 
  darkMode, 
  searchQuery, 
  setSearchQuery, 
  searchResults 
}) => {
  const searchInputRef = useRef(null);
  const searchModalRef = useRef(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 10);
    }
  }, [isOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchModalRef.current && !searchModalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] backdrop-blur-sm bg-black/30">
      <div 
        ref={searchModalRef}
        className={`w-full max-w-2xl mx-4 overflow-hidden transition-all duration-300 rounded-xl shadow-2xl ${
          darkMode 
            ? 'bg-gray-900/80 backdrop-blur-xl border border-gray-700/50' 
            : 'bg-white/80 backdrop-blur-xl border border-gray-300/50'
        }`}
        style={{ 
          animation: 'searchFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxShadow: darkMode 
            ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Search header */}
        <div className="flex items-center p-4 border-b border-gray-700/30">
          <Search className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for notes, tasks, and more..."
            className={`w-full px-3 py-2 bg-transparent border-none outline-none text-lg ${
              darkMode ? 'text-white placeholder:text-gray-500' : 'text-black placeholder:text-gray-400'
            }`}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex items-center gap-2">
            <div className={`px-1.5 py-0.5 rounded text-xs ${
              darkMode ? 'bg-white/10 text-gray-400' : 'bg-black/5 text-gray-500'
            }`}>
              ESC
            </div>
            <button 
              onClick={onClose}
              className={`p-1.5 rounded-full ${
                darkMode 
                  ? 'text-gray-400 hover:bg-white/10' 
                  : 'text-gray-500 hover:bg-black/10'
              }`}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search results */}
        <div className={`max-h-[60vh] overflow-y-auto ${searchResults.length === 0 ? 'hidden' : ''}`}>
          {searchResults.map(result => (
            <Link
              key={result.id}
              to={result.path}
              onClick={onClose}
              className={`flex items-center gap-3 p-4 ${
                darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                {result.type === 'note' ? (
                  <FileText size={18} className={darkMode ? 'text-[#A3F600]' : 'text-blue-600'} />
                ) : (
                  <CheckSquare size={18} className={darkMode ? 'text-[#A3F600]' : 'text-blue-600'} />
                )}
              </div>
              <div>
                <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{result.title}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {result.type === 'note' ? 'Note' : 'Task'}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No results state */}
        {searchQuery.trim() !== '' && searchResults.length === 0 && (
          <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No results found for "{searchQuery}"
          </div>
        )}

        {/* Empty state */}
        {searchQuery.trim() === '' && (
          <div className={`py-12 px-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Search size={40} className="mx-auto opacity-20 mb-4" />
            <p className="mb-2 text-lg">Start typing to search</p>
            <p className="text-sm">Search for notes, tasks, and more</p>
          </div>
        )}

        {/* Search tips */}
        <div className={`p-3 border-t text-xs ${
          darkMode 
            ? 'border-gray-700/30 text-gray-500 bg-black/20' 
            : 'border-gray-200 text-gray-500 bg-gray-50/50'
        }`}>
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-gray-500/20">↵</span>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-gray-500/20">ESC</span>
              <span>to close</span>
            </span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx="true">{`
        @keyframes searchFade {
          from {
            opacity: 0;
            transform: scale(0.97) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Add the missing icons
const FileText = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.className ? undefined : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
};

const CheckSquare = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.className ? undefined : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
};

export default SpotlightSearch;