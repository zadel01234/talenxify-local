import React from 'react';

const Tab = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex justify-center sm:justify-end px-4 sm:px-6 pt-4 bg-white-50 mt-15 sm:mt-13">
            <div className="flex items-center  bg-gray-200 rounded-lg w-full sm:w-fit">
                <button
                    onClick={() => onTabChange('jobs')}
                    role="tab"
                    aria-selected={activeTab === 'jobs'}
                    className={`flex-1 sm:flex-none px-8 bg-gray-200 sm:px-12 py-2 sm:py-1 rounded-md  font-medium transition-colors text-sm ${activeTab === 'jobs'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Jobs
                </button>
                <button
                    onClick={() => onTabChange('gigs')}
                    role="tab"
                    aria-selected={activeTab === 'gigs'}
                    className={`flex-1 sm:flex-none bg-gray-200 px-8 sm:px-12 py-2 sm:py-1 rounded-md font-medium transition-colors text-sm ${activeTab === 'gigs'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    Gigs
                </button>
            </div>
        </div>
    );
};

export default Tab;