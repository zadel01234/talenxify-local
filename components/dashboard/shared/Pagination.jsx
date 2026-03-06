'use client'
import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, resultsPerPage, totalResults, onPageChange, onResultsPerPageChange }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if we're on mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        // Initial check
        checkMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = isMobile ? 3 : 5; // Fewer pages on mobile

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= Math.min(3, totalPages); i++) {
                    pages.push(i);
                }
                if (totalPages > 3) {
                    pages.push('...');
                    pages.push(totalPages);
                }
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            {/* Pagination Controls */}
            <div className="flex gap-1 sm:gap-2 flex-wrap">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg transition-colors text-xs sm:text-sm ${currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    Back
                </button>

                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 sm:px-4 py-1.5 sm:py-2 text-gray-400 text-xs sm:text-sm">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${currentPage === page
                                ? 'bg-indigo-600 text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg transition-colors text-xs sm:text-sm ${currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    Next
                </button>
            </div>

            {/* Results Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 w-full sm:w-auto">
                <span className="whitespace-nowrap">
                    Showing {((currentPage - 1) * resultsPerPage) + 1}-{Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults}
                </span>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap">Results per page</span>
                    <select
                        value={resultsPerPage}
                        onChange={(e) => onResultsPerPageChange(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value={3}>3</option>
                        <option value={9}>9</option>
                        <option value={18}>18</option>
                        <option value={27}>27</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Pagination;