import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const Filters = ({ onFilterChange, onSearchChange }) => {
    const [isOpen, setIsOpen] = useState({
        skill: false,
        location: false,
        level: false,
        priceRange: false,
        jobType: false
    });

    const [filters, setFilters] = useState({
        skill: '',
        location: '',
        level: '',
        priceRange: '',
        jobType: ''
    });

    const [searchQuery, setSearchQuery] = useState('');

    const filterOptions = {
        skill: ['UI/UX Design', 'Frontend Development', 'Backend Development', 'Product Management', 'Data Science'],
        location: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Remote'],
        level: ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'],
        priceRange: ['₦100k-₦300k', '₦300k-₦500k', '₦500k-₦800k', '₦800k-₦1M', '₦1M+'],
        jobType: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
    };

    const toggleDropdown = (filterName) => {
        setIsOpen(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    const handleFilterSelect = (filterName, value) => {
        const newFilters = {
            ...filters,
            [filterName]: value
        };
        setFilters(newFilters);
        setIsOpen(prev => ({ ...prev, [filterName]: false }));
        onFilterChange(newFilters);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearchChange(query);
    };

    const clearFilter = (filterName) => {
        const newFilters = {
            ...filters,
            [filterName]: ''
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (

        <div className="mb-2 sm:mb-1">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-2 sm:mb-2">
                {/* Search Input */}
                <div className="flex-1 relative sm:mr-5">
                    <input
                        type="text"
                        placeholder="Search by job title, skill, company..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2 pr-10 text-xs sm:text-xs bg-indigo-50 border border-indigo-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Filter Buttons - Horizontal scroll on mobile */}
                <div className="flex sm:gap-2 pb-2 sm:pb-0 justify-between -mx-2 sm:-mx-5 px-1 sm:mx-0 sm:px-0" style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {Object.keys(filterOptions).map((filterName) => (
                        <div key={filterName} className="relative flex-shrink-0">
                            <button
                                onClick={() => toggleDropdown(filterName)}
                                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-xs border rounded-sm text-indigo-600 transition-colors whitespace-nowrap ${filters[filterName]
                                    ? 'bg-indigo-50 border-indigo-600 text-indigo-600'
                                    : 'border-indigo-600 hover:bg-gray-50'
                                    }`}
                            >
                                {/* Show full text on desktop, shortened on mobile */}
                                <span className="hidden sm:inline">
                                    {filters[filterName] || filterName.charAt(0).toUpperCase() + filterName.slice(1).replace(/([A-Z])/g, ' $1')}
                                </span>
                                <span className="sm:hidden">
                                    {filters[filterName] || filterName.charAt(0).toUpperCase() + filterName.slice(1).replace(/([A-Z])/g, ' $1').split(' ')[0]}
                                </span>
                                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen[filterName] ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isOpen[filterName] && (
                                <>
                                    {/* Backdrop for mobile - closes dropdown when clicked */}
                                    <div
                                        className="fixed inset-0 z-10 sm:hidden"
                                        onClick={() => toggleDropdown(filterName)}
                                    />

                                    <div className="absolute top-full left-0 sm:left-auto mt-2 w-48 sm:w-56 bg-white border text-black border-gray-200 rounded-lg shadow-lg z-20">
                                        <div className="py-2 max-h-64 overflow-y-auto">
                                            {filterOptions[filterName].map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleFilterSelect(filterName, option)}
                                                    className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors ${filters[filterName] === option ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Filters Display */}
            {Object.values(filters).some(val => val) && (
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                    {Object.entries(filters).map(([key, value]) =>
                        value && (
                            <div key={key} className="flex items-center gap-1.5 sm:gap-2 bg-indigo-100 text-indigo-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                                <span>{value}</span>
                                <button
                                    onClick={() => clearFilter(key)}
                                    className="hover:text-indigo-900 text-base sm:text-lg leading-none"
                                >
                                    ×
                                </button>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Filters;