// Mock data based on the dashboard images
// This will be replaced with real API calls

export const mockUser = {
    id: 1,
    name: 'Favour',
    email: 'favour@example.com',
    avatar: null,
};

export const mockWallet = {
    balance: 21000000.12,
    pendingPayment: 500000.00,
    currency: '₦',
};

export const mockStats = {
    myApplications: 50,
    completed: 3,
    ongoingApplications: 23,
    inReview: 5,
};

export const mockProfileCompletion = {
    percentage: 50,
    fields: [
        { name: 'Name', percentage: 100 },
        { name: 'Bio', percentage: 100 },
        { name: 'Gender', percentage: 100 },
        { name: 'Portfolio', percentage: 0 },
        { name: 'Skills', percentage: 50 },
        { name: 'Experience', percentage: 50 },
        { name: 'Contact', percentage: 100 },
        { name: 'Qualification Level', percentage: 0 },
        { name: 'Profile Image', percentage: 0 },
    ],
};

export const mockApplications = [
    {
        id: 1,
        title: 'Product Designer',
        company: 'Monispoint',
        date: '12/08/2025',
        status: 'Submitted',
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Monispoint',
        date: '10/08/2025',
        status: 'Shortlisted',
    },
    {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Monispoint',
        date: '4/08/2025',
        status: 'Submitted',
    },
    {
        id: 4,
        title: 'Product Designer',
        company: 'Monispoint',
        date: '1/08/2025',
        status: 'Interviewed',
    },
    {
        id: 5,
        title: 'UI/UX Developer',
        company: 'Monispoint',
        date: '25/07/2025',
        status: 'Shortlisted',
    },
    {
        id: 6,
        title: 'Product Designer',
        company: 'Monispoint',
        date: '15/07/2025',
        status: 'Rejected',
    },
    {
        id: 7,
        title: 'Product Designer',
        company: 'Monispoint',
        date: '12/07/2025',
        status: 'Submitted',
    },
    {
        id: 8,
        title: 'Creative Designer',
        company: 'Monispoint',
        date: '06/08/2025',
        status: 'Rejected',
    },
];