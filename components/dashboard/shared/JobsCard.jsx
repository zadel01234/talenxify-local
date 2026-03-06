'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, X } from 'lucide-react';
import ProfileCompletionModal from './ProfileCompletionModal';
import ProfileMethodModal from './ProfileMethodModal';

const JobsCard = ({ jobs }) => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMethodModal, setShowMethodModal] = useState(false);
    const router = useRouter();

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Relative time — computed directly from Date.now() without a timer
    const getRelativeTime = (createdAt) => {
        if (!createdAt) return 'Recently';
        try {
            const diffInMs = Date.now() - new Date(createdAt);
            const seconds = Math.floor(diffInMs / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);

            if (seconds < 60) return seconds <= 1 ? 'just now' : `${seconds} seconds ago`;
            if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
            if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
            if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`;
            if (weeks < 4) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
            if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;
            return years === 1 ? '1 year ago' : `${years} years ago`;
        } catch {
            return 'Recently';
        }
    };

    // Remove .00 from decimal budget values
    const formatBudget = (min, max, currency = '₦') => {
        if (!min || !max) return 'Negotiable';
        const cleanMin = String(min).replace(/\.00$/, '');
        const cleanMax = String(max).replace(/\.00$/, '');
        return `${currency}${cleanMin} - ${cleanMax}`;
    };

    const handleCardClick = (job) => setSelectedJob(job);
    const handleClose = () => setSelectedJob(null);
    const handleApplyClick = (e) => { e.stopPropagation(); setIsModalOpen(true); };
    const handleModalClose = () => setIsModalOpen(false);
    const handleCompleteProfile = () => { setIsModalOpen(false); setShowMethodModal(true); };
    const handleMethodModalClose = () => setShowMethodModal(false);
    const handleAutoGenerate = () => { setShowMethodModal(false); router.push('/dashboard/upload-resume'); };
    const handleManualFill = () => { setShowMethodModal(false); router.push('/dashboard/manual-fill'); };

    if (!jobs || jobs.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No jobs found. Try adjusting your filters.
            </div>
        );
    }

    // ─── MOBILE ───────────────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <div className="mb-6 space-y-4">
                {jobs.map((job) => {
                    const isExpanded = selectedJob?.id === job.id;

                    const company = job.recruiter_details?.organization_name || job.company || 'Company';
                    const logo = job.recruiter_details?.company_logo || job.logo || '/borcelle.png';
                    const position = job.title || job.position || 'Position';
                    const location = job.address || job.location || 'Remote';
                    const timePosted = getRelativeTime(job.created_at) || job.timePosted || 'Recently';
                    const jobType = job.job_type || job.type || 'Full-time';          // blue
                    const expLevel = job.experience_level || job.level || 'Mid-level'; // purple
                    const locationType = job.location_type || job.remote || 'Remote';      // green
                    const salary = formatBudget(job.budget_min, job.budget_max, job.budget_currency) !== 'Negotiable'
                        ? formatBudget(job.budget_min, job.budget_max, job.budget_currency)
                        : job.salary || 'Negotiable';
                    const applied = job.applications_count || job.applied || 0;

                    return (
                        <div
                            key={job.id}
                            className={`bg-white rounded-lg border transition-all ${isExpanded ? 'border-indigo-600 shadow-lg' : 'border-gray-200'
                                }`}
                        >
                            {/* Main Card Content */}
                            <div onClick={() => handleCardClick(job)} className="p-4 cursor-pointer">

                                {/* Header */}
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                        <img
                                            src={logo}
                                            alt={`${company} logo`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = '/borcelle.png'; }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-gray-900 truncate">{company}</h3>
                                        <p className="text-indigo-600 font-medium text-xs mt-0.5">{position}</p>
                                    </div>
                                </div>

                                {/* Location and Time */}
                                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-indigo-500" />
                                        <span>{location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-indigo-500" />
                                        <span>{timePosted}</span>
                                    </div>
                                </div>

                                {/* Description — hidden when expanded */}
                                {!isExpanded && (
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                                        {job.description}
                                    </p>
                                )}

                                {/* Tags — hidden when expanded */}
                                {!isExpanded && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{jobType}</span>
                                        <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">{expLevel}</span>
                                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">{locationType}</span>
                                    </div>
                                )}

                                {/* Footer — hidden when expanded */}
                                {!isExpanded && (
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-3 text-xs text-gray-800">
                                            <span className="font-medium">{salary}</span>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3 h-3 text-indigo-500" />
                                                <span>{applied} Applied</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleCardClick(job); }}
                                            className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Expanded Details — Mobile */}
                            {isExpanded && (
                                <div className="px-4 pb-5 border-t border-gray-100 pt-5 bg-gray-50 relative">
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-600" />
                                    </button>

                                    <h4 className="text-base font-bold text-gray-900 mb-4">Job Summary</h4>

                                    <div className="mb-4">
                                        <h5 className="text-sm font-bold text-indigo-600 mb-2">Description:</h5>
                                        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
                                    </div>

                                    {job.responsibilities && (
                                        <div className="mb-4">
                                            <h5 className="text-sm font-bold text-indigo-600 mb-2">Responsibilities:</h5>
                                            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
                                        </div>
                                    )}

                                    {job.qualifications && (
                                        <div className="mb-4">
                                            <h5 className="text-sm font-bold text-indigo-600 mb-2">Qualifications:</h5>
                                            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{job.qualifications}</p>
                                        </div>
                                    )}

                                    {job.skills_required && job.skills_required.length > 0 && (
                                        <div className="mb-4">
                                            <h5 className="text-sm font-bold text-indigo-600 mb-2">Required Skills:</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {job.skills_required.map((skill, index) => (
                                                    <span key={index} className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-center pt-4 border-t border-gray-200">
                                        <button
                                            onClick={handleApplyClick}
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                <ProfileCompletionModal isOpen={isModalOpen} onClose={handleModalClose} onComplete={handleCompleteProfile} />
                <ProfileMethodModal isOpen={showMethodModal} onClose={handleMethodModalClose} onAutoGenerate={handleAutoGenerate} onManualFill={handleManualFill} />
            </div>
        );
    }

    // ─── DESKTOP ──────────────────────────────────────────────────────────────
    return (
        <div className="mb-6">
            {!selectedJob ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3">
                    {jobs.map((job) => {
                        const company = job.recruiter_details?.organization_name || job.company || 'Company';
                        const logo = job.recruiter_details?.company_logo || job.logo || '/borcelle.png';
                        const position = job.title || job.position || 'Position';
                        const location = job.address || job.location || 'Remote';
                        const timePosted = getRelativeTime(job.created_at) || job.timePosted || 'Recently';
                        const jobType = job.job_type || job.type || 'Full-time';
                        const expLevel = job.experience_level || job.level || 'Mid-level';
                        const locationType = job.location_type || job.remote || 'Remote';
                        const salary = formatBudget(job.budget_min, job.budget_max, job.budget_currency) !== 'Negotiable'
                            ? formatBudget(job.budget_min, job.budget_max, job.budget_currency)
                            : job.salary || 'Negotiable';
                        const applied = job.applications_count || job.applied || 0;
                        const description = job.description || '';

                        return (
                            <div
                                key={job.id}
                                onClick={() => handleCardClick(job)}
                                className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                {/* Header */}
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                        <img
                                            src={logo}
                                            alt={`${company} logo`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = '/borcelle.png'; }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-gray-900 truncate">{company}</h3>
                                        <p className="text-indigo-600 font-medium text-xs sm:text-sm mt-0.5">{position}</p>
                                    </div>
                                </div>

                                {/* Location and Time */}
                                <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-indigo-500" />
                                        <span>{location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-indigo-500" />
                                        <span>{timePosted}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-600 mb-2 line-clamp-3 text-justify">
                                    {description}
                                </p>

                                {/* Tags: blue = job type, purple = experience level, green = location type */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{jobType}</span>
                                    <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">{expLevel}</span>
                                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">{locationType}</span>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-4 text-xs text-gray-800">
                                        <span className="font-medium">{salary}</span>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
                                            <span>{applied} Applied</span>
                                        </div>
                                    </div>
                                    <button className="px-3 sm:px-3.5 py-1.5 bg-indigo-600 text-white rounded text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // Detail View — Desktop
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Sidebar — Job List */}
                    <div className="lg:col-span-1 space-y-4 max-h-screen overflow-y-auto">
                        {jobs.map((job) => {
                            const company = job.recruiter_details?.organization_name || job.company || 'Company';
                            const logo = job.recruiter_details?.company_logo || job.logo || '/borcelle.png';
                            const position = job.title || job.position || 'Position';
                            const location = job.address || job.location || 'Remote';
                            const timePosted = getRelativeTime(job.created_at) || job.timePosted || 'Recently';
                            const jobType = job.job_type || job.type || 'Full-time';
                            const expLevel = job.experience_level || job.level || 'Mid-level';
                            const locationType = job.location_type || job.remote || 'Remote';
                            const salary = formatBudget(job.budget_min, job.budget_max, job.budget_currency) !== 'Negotiable'
                                ? formatBudget(job.budget_min, job.budget_max, job.budget_currency)
                                : job.salary || 'Negotiable';
                            const applied = job.applications_count || job.applied || 0;

                            return (
                                <div
                                    key={job.id}
                                    onClick={() => handleCardClick(job)}
                                    className={`bg-white rounded-lg border p-4 cursor-pointer transition-all ${selectedJob.id === job.id
                                        ? 'border-indigo-600 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                            <img
                                                src={logo}
                                                alt={`${company} logo`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = '/borcelle.png'; }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-xs text-gray-900 truncate">{company}</h3>
                                            <p className="text-indigo-600 text-xs mt-0.5 truncate">{position}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                                        <MapPin className="w-3 h-3" />
                                        <span>{location}</span>
                                        <Clock className="w-3 h-3 ml-1" />
                                        <span>{timePosted}</span>
                                    </div>

                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{job.description}</p>

                                    {/* Tags: blue = job type, purple = experience level, green = location type */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">{jobType}</span>
                                        <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs">{expLevel}</span>
                                        <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-xs">{locationType}</span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <span className="text-xs font-medium text-gray-600">{salary}</span>
                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                            <Users className="w-3 h-3" />
                                            <span>{applied} Applied</span>
                                        </div>
                                        <button
                                            onClick={handleApplyClick}
                                            className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Panel — Job Details */}
                    <div className="lg:col-span-2 bg-white rounded-lg border border-indigo-600 p-6 sm:p-8 relative max-h-screen overflow-y-auto">
                        {(() => {
                            const company = selectedJob.recruiter_details?.organization_name || selectedJob.company || 'Company';
                            const logo = selectedJob.recruiter_details?.company_logo || selectedJob.logo || '/borcelle.png';
                            const position = selectedJob.title || selectedJob.position || 'Position';
                            const location = selectedJob.address || selectedJob.location || 'Remote';
                            const timePosted = getRelativeTime(selectedJob.created_at) || selectedJob.timePosted || 'Recently';

                            return (
                                <>
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-600" />
                                    </button>

                                    {/* Header */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                            <img
                                                src={logo}
                                                alt={`${company} logo`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = '/borcelle.png'; }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{company}</h2>
                                            <h3 className="text-lg sm:text-xl text-indigo-600 font-semibold mb-2">{position}</h3>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{location}</span>
                                                </div>
                                                <span>•</span>
                                                <span>{timePosted}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        <button
                                            onClick={handleApplyClick}
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-sm font-medium hover:bg-indigo-700 transition-colors"
                                        >
                                            Apply Now
                                        </button>
                                        <button className="px-6 py-2 text-indigo-500 border border-gray-300 rounded-sm font-medium hover:bg-gray-200 transition-colors">
                                            Share
                                        </button>
                                    </div>

                                    {/* Job Details */}
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-3">Job Details</h4>

                                            <div className="mb-4">
                                                <h5 className="text-indigo-600 font-semibold mb-2">Description:</h5>
                                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                    {selectedJob.description}
                                                </p>
                                            </div>

                                            {selectedJob.responsibilities && (
                                                <div className="mb-4">
                                                    <h5 className="text-indigo-600 font-semibold mb-2">Responsibilities:</h5>
                                                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                        {selectedJob.responsibilities}
                                                    </p>
                                                </div>
                                            )}

                                            {selectedJob.qualifications && (
                                                <div className="mb-4">
                                                    <h5 className="text-indigo-600 font-semibold mb-2">Qualifications:</h5>
                                                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                        {selectedJob.qualifications}
                                                    </p>
                                                </div>
                                            )}

                                            {selectedJob.skills_required && selectedJob.skills_required.length > 0 && (
                                                <div className="mb-4">
                                                    <h5 className="text-indigo-600 font-semibold mb-2">Required Skills:</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedJob.skills_required.map((skill, index) => (
                                                            <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded text-sm">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {selectedJob.benefits && (
                                                <div className="mb-4">
                                                    <h5 className="text-indigo-600 font-semibold mb-2">Benefits:</h5>
                                                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                        {selectedJob.benefits}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            <ProfileCompletionModal isOpen={isModalOpen} onClose={handleModalClose} onComplete={handleCompleteProfile} />
            <ProfileMethodModal isOpen={showMethodModal} onClose={handleMethodModalClose} onAutoGenerate={handleAutoGenerate} onManualFill={handleManualFill} />
        </div>
    );
};

export default JobsCard;