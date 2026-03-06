'use client'
import React, { useState } from 'react';
import { MapPin, Clock, Eye, Heart, ChevronDown, ChevronUp, Star } from 'lucide-react';
import ApplyGigModal from './ApplyGigModal'; // Import the Apply Modal
import SuccessModal from './SuccessModal'; // Import the Success Modal

const GigsCard = ({ gigs }) => {
  const [expandedGigId, setExpandedGigId] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);

  const handleApplyClick = (e, gig) => {
    e.stopPropagation();
    setSelectedGig(gig);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = () => {
    setIsApplyModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    setSelectedGig(null);
  };

  const handleCloseApply = () => {
    setIsApplyModalOpen(false);
    setSelectedGig(null);
  };

  const handleCardClick = (gigId) => {
    setExpandedGigId(expandedGigId === gigId ? null : gigId);
  };

  // Handle empty state
  if (!gigs || gigs.length === 0) {
    return (
      <div className="">
      </div>
    );
  }

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        {gigs.map((gig) => {
          const isExpanded = expandedGigId === gig.id;

          return (
            <div
              key={gig.id}
              className={`bg-white rounded-lg border transition-all ${isExpanded ? 'border-indigo-600 shadow-lg' : 'border-gray-200'
                }`}
            >
              {/* Main Card Content - Always Visible */}
              <div
                onClick={() => handleCardClick(gig.id)}
                className="p-4 sm:p-5 cursor-pointer"
              >
                {/* Header with name, rating, and heart icon */}
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                      {gig.freelancer}
                    </h3>
                    {gig.verified && (
                      <svg width="14" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.81836 0.242188C6.57294 -0.0811644 7.42706 -0.0811641 8.18164 0.242188L13.3936 2.47559C13.7612 2.63316 14 2.99548 14 3.39551V8.64844C13.9999 10.586 13.064 12.4041 11.4873 13.5303L8.16211 15.9053C7.46679 16.4018 6.53321 16.4018 5.83789 15.9053L2.5127 13.5303C0.936025 12.4041 0.000119299 10.586 0 8.64844V3.39551C0 2.99548 0.238761 2.63316 0.606445 2.47559L5.81836 0.242188ZM10.625 4.95508C10.1937 4.61007 9.56376 4.68007 9.21875 5.11133L5.91797 9.23828L4.70703 8.0293C4.31651 7.63877 3.68349 7.63877 3.29297 8.0293C2.90261 8.41983 2.9025 9.05289 3.29297 9.44336L4.89746 11.0488C5.52958 11.6808 6.57141 11.6227 7.12988 10.9248L10.7812 6.36133C11.1262 5.93012 11.0561 5.30011 10.625 4.95508Z" fill="#596CFF" />
                      </svg>
                    )}
                    <div className="flex items-center gap-1.5 text-xs">
                      {renderStars(gig.rating)}
                      <span className="text-gray-600">{gig.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      <span className='text-indigo-500'>{gig.timePosted}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className='flex items-start justify-between'>
                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-semibold text-indigo-600">
                    {gig.title}
                  </h4>
                  <span className="text-sm sm:text-base font-semibold text-indigo-500">
                    {gig.price}
                  </span>
                </div>
                {/* Description - Only show when NOT expanded */}
                {!isExpanded && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                    {gig.description}
                  </p>
                )}

                {/* Tags - Only show when NOT expanded */}
                {!isExpanded && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      {gig.level}
                    </span>
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded text-xs font-medium">
                      {gig.remote}
                    </span>
                    <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">
                      {gig.duration}
                    </span>
                  </div>
                )}

                {/* Footer - Only show when NOT expanded */}
                {!isExpanded && (
                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Eye className="w-4 h-4 text-indigo-400" />
                      <span>{gig.views} views</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(gig.id);
                        }}
                        className="px-4 py-1.5 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Expanded Details - Shown when clicked */}
              {isExpanded && gig.gigDetails && (
                <div className="px-4 sm:px-5 pb-5 bg-white">
                  {/* Summary */}
                  <div className="mb-5">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">Summary</h4>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {gig.description}
                    </p>
                  </div>

                  {/* Deliverables */}
                  {gig.gigDetails.deliverables && gig.gigDetails.deliverables.length > 0 && (
                    <div className="mb-5">
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Deliverables</h5>
                      <ul className="space-y-1.5 pl-1">
                        {gig.gigDetails.deliverables.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      {gig.level}
                    </span>
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded text-xs font-medium">
                      {gig.remote}
                    </span>
                    <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">
                      {gig.duration}
                    </span>
                  </div>

                  {/* Attachments */}
                  {gig.gigDetails.attachments && gig.gigDetails.attachments.length > 0 && (
                    <div className="mb-5">
                      <h5 className="text-sm font-bold text-gray-900 mb-2">
                        Attachments ({gig.gigDetails.attachments.length})
                      </h5>
                      <div className="space-y-1.5">
                        {gig.gigDetails.attachments.map((attachment, index) => (
                          <a
                            key={index}
                            href={attachment.url}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-xs sm:text-sm text-indigo-600 hover:text-indigo-700"
                          >
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span className="font-medium">{attachment.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills and Expertise */}
                  {gig.gigDetails.skills && gig.gigDetails.skills.length > 0 && (
                    <div className="mb-5">
                      <h5 className="text-sm font-bold text-gray-900 mb-2">Skills and Expertise</h5>
                      <div className="flex flex-wrap gap-2">
                        {gig.gigDetails.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Views and Apply Button at Bottom */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                      <Eye className="w-4 h-4 text-indigo-500" />
                      <span>{gig.views} views</span>
                    </div>
                    <button
                      onClick={(e) => handleApplyClick(e, gig)}
                      className="px-5 sm:px-6 py-2 sm:py-1 bg-indigo-600 text-white rounded text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Apply Gig
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <ApplyGigModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseApply}
        onSubmit={handleSubmitApplication}
        gigTitle={selectedGig?.title}
        gigRating={selectedGig?.rating}
        gigtimePosted={selectedGig?.timePosted}
        gigPrice={selectedGig?.price}
        freelancerName={selectedGig?.freelancer}
        verified={selectedGig?.verified}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccess}
      />
    </>
  );
};

export default GigsCard;
