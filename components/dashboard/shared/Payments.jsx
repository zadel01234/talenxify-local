'use client'
import React, { useState } from 'react';
import WalletCard from '../dashboard/WalletCard';
import { walletData, payments } from './PaymentMockData';
import {
    useWallet,
    useWithdraw,
} from "@/lib/hooks/useApi";

// ─── Status Badge ───────────────────────────────────────────────

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: 'bg-amber-50 text-amber-600',
        Paid: 'bg-emerald-50 text-emerald-600',
        Rejected: 'bg-red-50 text-red-600',
    };

    return (
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
};

// ─── Payment Details Modal ──────────────────────────────────────

const PaymentDetailsModal = ({ payment, onClose }) => {
    if (!payment) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900">Payment Details</h2>
                    <button
                        onClick={onClose}
                        className="text-indigo-500 hover:text-indigo-700 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                    {/* Amount section */}
                    <div className="text-center mb-6">
                        <p className="text-xs text-gray-500 mb-1">Amount:</p>
                        <p className="text-3xl font-bold text-emerald-600">₦{payment.amount}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            ₦{payment.amount} has been successfully credited to your wallet.
                        </p>
                    </div>

                    {/* Details grid */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Status:</span>
                            <span className="text-xs font-semibold text-emerald-600">{payment.statusDetail}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">From:</span>
                            <span className="text-xs font-semibold text-gray-900">{payment.from}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Gig:</span>
                            <span className="text-xs font-semibold text-gray-900">{payment.gig}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Date:</span>
                            <span className="text-xs font-semibold text-gray-900">{payment.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Reference ID:</span>
                            <span className="text-xs font-semibold text-gray-900">{payment.reference}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main Payment Page ──────────────────────────────────────────

const Payments = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showAllPayments, setShowAllPayments] = useState(false);
    const { data: wallet, isLoading: walletLoading } = useWallet();

    const isLoading = walletLoading
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    // Withdraw mutation
    const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw({
        onSuccess: (data) => {
            console.log('Withdrawal successful:', data);
            setIsWithdrawModalOpen(false);
            alert('Withdrawal initiated successfully!');
        },
        onError: (error) => {
            console.error('Withdrawal failed:', error);
            alert('Withdrawal failed. Please try again.');
        },
    });

    const handleWithdraw = () => {
        setIsWithdrawModalOpen(true);
    };

    // Show only 7 recent payments initially, or all if showAllPayments is true
    const displayedPayments = showAllPayments ? payments : payments.slice(0, 7);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 mt-18">
            <div className="max-w-6xl mx-auto">

                {/* Page Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Payment</h1>

                {/* Top Cards Row — stack on mobile, 3-col on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                    {/* Wallet Balance Card */}
                    <WalletCard
                        balance={wallet?.balance}
                        pendingPayment={wallet?.pendingPayment}
                        currency={wallet?.currency}
                        onWithdraw={handleWithdraw}
                    />

                    {/* Total Earnings Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 ">
                        <p className="text-xs font-medium text-gray-500 mb-1">Total Earnings</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">₦{walletData.totalEarnings}</p>
                    </div>

                    {/* Pending Payment Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-5">
                        <p className="text-xs font-medium text-gray-500 mb-1">Pending Payment</p>
                        <p className="text-2xl sm:text-3xl font-bold text-amber-500">₦{walletData.pendingPaymentAmount}</p>
                    </div>
                </div>

                {/* Recent Payments Section */}

                {/* Section header */}
                <div className="flex items-center justify-between px-5 py-4">
                    <h2 className="text-base font-semibold text-gray-900">Recent Payments</h2>
                    <button
                        onClick={() => setShowAllPayments(!showAllPayments)}
                        className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        {showAllPayments ? 'Show Less' : 'View All'}
                    </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                    {/* Table — horizontal scroll on mobile */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {displayedPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                        {/* Job */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3 min-w-[180px]">
                                                <img
                                                    src={payment.avatar}
                                                    alt={payment.jobTitle}
                                                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{payment.jobTitle}</p>
                                                    <p className="text-xs text-indigo-600 truncate">{payment.company}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Amount */}
                                        <td className="px-5 py-4">
                                            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">₦{payment.amount}</span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <StatusBadge status={payment.status} />
                                        </td>

                                        {/* Date */}
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-gray-600 whitespace-nowrap">{payment.date}</span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-5 py-4">
                                            <button
                                                onClick={() => setSelectedPayment(payment)}
                                                className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium whitespace-nowrap"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Payment Details Modal */}
            {selectedPayment && (
                <PaymentDetailsModal
                    payment={selectedPayment}
                    onClose={() => setSelectedPayment(null)}
                />
            )}
        </div>
    );
};

export default Payments;