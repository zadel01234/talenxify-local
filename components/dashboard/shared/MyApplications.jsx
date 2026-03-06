'use client'
import React, { useState, useMemo } from 'react';
import { applications } from './ApplicationsMockData';
import Pagination from './Pagination';

// ─── Sub-components ─────────────────────────────────────────────

const StarRating = ({ rating, ratingCount }) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return (
        <span className="flex items-center gap-1">
            <span className="flex">
                {[...Array(5)].map((_, i) => {
                    if (i < fullStars) {
                        return (
                            <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5 text-amber-400 fill-current">
                                <path d="M8 1l2.02 4.09L15.2 5.8l-3.6 3.51L12.6 15 8 12.27 3.4 15l1-5.69L.8 5.8l5.18-.71z" />
                            </svg>
                        );
                    }
                    if (i === fullStars && hasHalf) {
                        return (
                            <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5 text-amber-400">
                                <defs>
                                    <linearGradient id={`half-${i}`}>
                                        <stop offset="50%" stopColor="currentColor" />
                                        <stop offset="50%" stopColor="#d1d5db" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M8 1l2.02 4.09L15.2 5.8l-3.6 3.51L12.6 15 8 12.27 3.4 15l1-5.69L.8 5.8l5.18-.71z"
                                    fill={`url(#half-${i})`}
                                />
                            </svg>
                        );
                    }
                    return (
                        <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5 text-gray-300 fill-current">
                            <path d="M8 1l2.02 4.09L15.2 5.8l-3.6 3.51L12.6 15 8 12.27 3.4 15l1-5.69L.8 5.8l5.18-.71z" />
                        </svg>
                    );
                })}
            </span>
            <span className="text-xs text-gray-500 ml-0.5">{ratingCount}</span>
        </span>
    );
};

const StatusBadge = ({ status }) => {
    if (!status) return null;

    const styles = {
        Shortlisted: 'bg-indigo-50 text-indigo-600',
        Rejected: 'bg-red-50 text-red-600',
        Completed: 'bg-green-50 text-green-600',
        Pending: 'bg-amber-50 text-amber-600',
    };

    return (
        <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
};

// ─── Expanded Detail Panel ──────────────────────────────────────

const DetailPanel = ({ app, onClose }) => (
    <div className="mt-4 pt-4 border-t border-gray-100">
        {/* Meta row – 1 col on mobile, 3 on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M10 1a9 9 0 100 18A9 9 0 0010 1zM10 5v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="min-w-0">
                    <span className="block text-xs text-gray-400">Deadline</span>
                    <span className="block text-xs font-semibold text-gray-700 truncate">{app.deadline}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" strokeLinejoin="round" />
                    <circle cx="10" cy="9" r="2.5" />
                </svg>
                <div className="min-w-0">
                    <span className="block text-xs text-gray-400">Location</span>
                    <span className="block text-xs font-semibold text-gray-700 truncate">{app.location}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M4 4h12v3l-4 3 4 3v3H4v-3l4-3-4-3V4z" strokeLinejoin="round" />
                </svg>
                <div className="min-w-0">
                    <span className="block text-xs text-gray-400">Experience</span>
                    <span className="block text-xs font-semibold text-gray-700 truncate">{app.experience}</span>
                </div>
            </div>
        </div>

        {/* Responsibilities + Qualifications – 1 col mobile, 2 col sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Responsibilities</h4>
                <ul className="space-y-1.5">
                    {app.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" fill="currentColor">
                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.7 6.3l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L7.25 8.69l3.47-3.47a.75.75 0 111.06 1.06z" />
                            </svg>
                            <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Qualifications</h4>
                <ul className="space-y-1.5">
                    {app.qualifications.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" fill="currentColor">
                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.7 6.3l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L7.25 8.69l3.47-3.47a.75.75 0 111.06 1.06z" />
                            </svg>
                            <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Collapse link */}
        <button
            onClick={onClose}
            className="mt-4 text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
        >
            <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M3 5l5 5 5-5" />
            </svg>
            Collapse details
        </button>
    </div>
);

// ─── Application Card ───────────────────────────────────────────

const ApplicationCard = ({ app }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white hover:shadow-sm transition-shadow">
            {/* Header – stacks on mobile, side-by-side on sm+ */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                {/* Left block */}
                <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm">{app.applicantName}</span>
                        {app.isVerified && (
                            <svg viewBox="0 0 16 16" className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor">
                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.7 6.3l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L7.25 8.69l3.47-3.47a.75.75 0 111.06 1.06z" />
                            </svg>
                        )}
                        <StarRating rating={app.rating} ratingCount={app.ratingCount} />
                        <span className="text-xs text-gray-400">{app.timePosted}</span>
                    </div>
                    <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-0.5 truncate block"
                        onClick={(e) => e.preventDefault()}
                    >
                        {app.jobTitle}
                    </a>
                </div>

                {/* Right block – salary + bookmark spread across full width on mobile */}
                <div className="flex items-center justify-between sm:justify-end sm:flex-shrink-0 sm:gap-3">
                    <span className="text-sm font-semibold text-gray-800">{app.salaryRange}</span>
                    <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className="text-gray-300 hover:text-indigo-600 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8}>
                            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Description – clamped when collapsed */}
            <p className={`text-xs text-gray-500 mt-2.5 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                {app.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
                {app.tags.map((tag, i) => (
                    <span key={i} className="border border-gray-200 text-gray-600 text-xs px-2.5 py-0.5 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer – stacks on very small screens, row otherwise */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3.5 pt-3 border-t border-gray-100 gap-2">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" strokeLinejoin="round" />
                            <circle cx="8" cy="8" r="2" />
                        </svg>
                        {app.views} views
                    </span>
                    <StatusBadge status={app.status} />
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`text-xs font-medium px-4 py-1.5 rounded-lg transition-colors w-full sm:w-auto ${isExpanded
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    {isExpanded ? 'Hide Details' : 'View Details'}
                </button>
            </div>

            {/* Expanded detail panel */}
            {isExpanded && <DetailPanel app={app} onClose={() => setIsExpanded(false)} />}
        </div>
    );
};

// ─── Main Page ──────────────────────────────────────────────────

const MyApplications = () => {
    const [activeTab, setActiveTab] = useState('All Applications');
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(3);
    const [sortBy, setSortBy] = useState('Latest');
    const [showAll, setShowAll] = useState(false);

    // Derive tab counts
    const counts = useMemo(() => ({
        all: applications.length,
        ongoing: applications.filter((a) => a.status === null || a.status === 'Shortlisted').length,
        completed: applications.filter((a) => a.status === 'Completed').length,
        rejected: applications.filter((a) => a.status === 'Rejected').length,
    }), []);

    const tabs = [
        { label: 'All Applications', count: counts.all },
        { label: 'Ongoing', count: counts.ongoing },
        { label: 'Completed', count: counts.completed },
        { label: 'Rejected', count: counts.rejected },
    ];

    // Filter by active tab
    const filtered = useMemo(() => {
        switch (activeTab) {
            case 'Ongoing':
                return applications.filter((a) => a.status === null || a.status === 'Shortlisted');
            case 'Completed':
                return applications.filter((a) => a.status === 'Completed');
            case 'Rejected':
                return applications.filter((a) => a.status === 'Rejected');
            default:
                return applications;
        }
    }, [activeTab]);

    // Sort
    const sorted = useMemo(() => {
        const copy = [...filtered];
        switch (sortBy) {
            case 'Latest':
                return copy;
            case 'Oldest':
                return copy.reverse();
            case 'Highest Pay':
                return copy.sort((a, b) => {
                    const getMax = (s) => {
                        const nums = s.replace(/[₦,]/g, '').match(/\d+/g);
                        return nums ? Math.max(...nums.map(Number)) : 0;
                    };
                    return getMax(b.salaryRange) - getMax(a.salaryRange);
                });
            default:
                return copy;
        }
    }, [filtered, sortBy]);

    // When showAll is on, bypass normal pagination and show everything
    const effectivePerPage = showAll ? (sorted.length || 1) : resultsPerPage;
    const totalPages = Math.ceil(sorted.length / effectivePerPage);
    const paginated = sorted.slice(
        (currentPage - 1) * effectivePerPage,
        currentPage * effectivePerPage
    );

    // ── Handlers ──
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setShowAll(false);
    };

    const handleResultsPerPageChange = (num) => {
        setResultsPerPage(num);
        setCurrentPage(1);
        setShowAll(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 mt-15">
            <div className="max-w-6xl">

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">My Applications</h1>

                {/* Tabs + Sort – column on mobile, row on sm+ */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                    <div className="flex flex-wrap gap-1.5">
                        {tabs.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => handleTabChange(tab.label)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${activeTab === tab.label
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-indigo-600 hover:bg-indigo-50'
                                    }`}
                            >
                                {tab.label}
                                <span
                                    className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 text-xs rounded-full px-1 ${activeTab === tab.label
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-indigo-100 text-indigo-700'
                                        }`}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span>Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-lg px-2.5 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="Latest">Latest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Highest Pay">Highest Pay</option>
                        </select>
                    </div>
                </div>

                {/* Section label + View All / Show Less */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">Recent Applications</span>
                    {showAll ? (
                        <button
                            onClick={() => { setShowAll(false); setCurrentPage(1); }}
                            className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Show Less
                        </button>
                    ) : (
                        <button
                            onClick={() => { setShowAll(true); setCurrentPage(1); }}
                            className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            View All
                        </button>
                    )}
                </div>

                {/* Application Cards */}
                <div className="flex flex-col gap-3">
                    {paginated.length > 0 ? (
                        paginated.map((app) => <ApplicationCard key={app.id} app={app} />)
                    ) : (
                        <div className="text-center py-12 text-gray-400 text-sm border border-gray-200 rounded-xl bg-white">
                            No applications found in this category.
                        </div>
                    )}
                </div>

                {/* Pagination – hidden while "View All" is active */}
                {!showAll && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        resultsPerPage={resultsPerPage}
                        totalResults={sorted.length}
                        onPageChange={setCurrentPage}
                        onResultsPerPageChange={handleResultsPerPageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default MyApplications;