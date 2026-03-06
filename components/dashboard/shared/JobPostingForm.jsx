'use client'

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Bold, Italic, Underline, RotateCcw, RotateCw, List, ListOrdered, Link, Smile, Image as ImageIcon, AlertCircle } from 'lucide-react';


// Select Component
const Select = ({ label, value, onChange, options, required, placeholder, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isPlaceholder = value === placeholder;

    return (
        <div className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}{required && <span className="text-red-500">*</span>}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-11 px-3 bg-white border rounded-md text-left flex items-center justify-between focus:outline-none focus:ring-1 transition-all ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={`text-sm ${isPlaceholder ? 'text-gray-400' : 'text-gray-700'}`}>
                    {value}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto" role="listbox">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-3 py-2.5 hover:bg-blue-50 text-sm text-gray-700 transition-colors"
                                role="option"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {error && (
                <div className="flex items-center gap-1.5 text-red-600 text-sm mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}; 

// Skills Selector Component
const SkillsSelector = ({ selectedSkills, onSkillsChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const availableSkills = [
        'User Interface Design',
        'UI/UX',
        'Figma',
        'User Research',
        'Wireframing',
        'Prototyping',
        'UX Writing',
        'Framer',
        'Design Systems',
        'User Experience',
        'Mobile App',
        'Web Design',
        'Sketch',
        'Adobe XD',
        'Interaction Design',
        'Visual Design',
        'React',
        'Vue.js',
        'Angular',
        'JavaScript',
        'TypeScript',
        'CSS',
        'HTML',
        'Tailwind CSS'
    ];

    const filteredSkills = availableSkills.filter(
        skill => !selectedSkills.includes(skill) && skill.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addSkill = (skill) => {
        if (!selectedSkills.includes(skill)) {
            onSkillsChange([...selectedSkills, skill]);
            setSearchTerm('');
            setIsOpen(false);
        }
    };

    const removeSkill = (skillToRemove) => {
        onSkillsChange(selectedSkills.filter(skill => skill !== skillToRemove));
    };

    return (
        <div className="space-y-2">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search skills..."
                    className={`w-full h-11 px-3 border rounded-md focus:outline-none focus:ring-1 text-sm transition-all ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                    aria-label="Search and add skills"
                />

                {isOpen && searchTerm && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {filteredSkills.length > 0 ? (
                                filteredSkills.map((skill) => (
                                    <button
                                        key={skill}
                                        type="button"
                                        onClick={() => addSkill(skill)}
                                        className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm transition-colors"
                                    >
                                        {skill}
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">No skills found</div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill(skill)}
                                className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                                type="button"
                                aria-label={`Remove ${skill}`}
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {error && (
                <div className="flex items-center gap-1.5 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

// Combo Box Component (Select + Input)
const ComboBox = ({ label, value, onChange, options, required, placeholder, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value === placeholder ? '' : value);
    const inputRef = useRef(null);

    useEffect(() => {
        if (value !== placeholder) {
            setInputValue(value);
        }
    }, [value, placeholder]);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(newValue || placeholder);
        setIsOpen(true);
    };

    const handleSelectOption = (option) => {
        setInputValue(option);
        onChange(option);
        setIsOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => setIsOpen(false), 200);
    };

    return (
        <div className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}{required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={`w-full h-11 px-3 pr-10 bg-white border rounded-md text-sm focus:outline-none focus:ring-1 transition-all ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                />
                <button
                    type="button"
                    onClick={() => {
                        setIsOpen(!isOpen);
                        inputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {isOpen && filteredOptions.length > 0 && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredOptions.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleSelectOption(option)}
                                className="w-full text-left px-3 py-2.5 hover:bg-blue-50 text-sm text-gray-700 transition-colors"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {error && (
                <div className="flex items-center gap-1.5 text-red-600 text-sm mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, error, onClear }) => {
    const editorRef = useRef(null);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [history, setHistory] = useState([value || '']);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Initialize ONCE
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value || '';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Clear editor when onClear is called
    useEffect(() => {
        if (onClear && editorRef.current) {
            editorRef.current.innerHTML = '';
            setHistory(['']);
            setHistoryIndex(0);
        }
    }, [onClear]);

    const executeCommand = (command, val = null) => {
        if (typeof document === 'undefined') return;
        document.execCommand(command, false, val);
        updateContent();
    };

    const updateContent = () => {
        if (!editorRef.current) return;

        const html = editorRef.current.innerHTML;
        onChange(html);

        setHistory(prev => {
            if (prev[historyIndex] === html) return prev;
            const next = prev.slice(0, historyIndex + 1);
            next.push(html);
            setHistoryIndex(next.length - 1);
            return next;
        });
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            editorRef.current.innerHTML = history[newIndex];
            onChange(history[newIndex]);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            editorRef.current.innerHTML = history[newIndex];
            onChange(history[newIndex]);
        }
    };

    const ToolbarButton = ({ onClick, active, disabled, title, children }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={[
                'p-2 rounded transition-colors',
                active
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
                disabled && 'opacity-50 cursor-not-allowed'
            ].join(' ')}
        >
            {children}
        </button>
    );

    return (
        <div>
            <div className={`border rounded-md overflow-hidden ${error ? 'border-red-500' : 'border-gray-300'}`}>
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 relative">
                    <ToolbarButton onClick={() => executeCommand('bold')} title="Bold">
                        <Bold className="w-4 h-4" />
                    </ToolbarButton>

                    <ToolbarButton onClick={() => executeCommand('italic')} title="Italic">
                        <Italic className="w-4 h-4" />
                    </ToolbarButton>

                    <ToolbarButton onClick={() => executeCommand('underline')} title="Underline">
                        <Underline className="w-4 h-4" />
                    </ToolbarButton>

                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    <ToolbarButton
                        onClick={handleUndo}
                        disabled={historyIndex === 0}
                        title="Undo"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={handleRedo}
                        disabled={historyIndex === history.length - 1}
                        title="Redo"
                    >
                        <RotateCw className="w-4 h-4" />
                    </ToolbarButton>

                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    <ToolbarButton
                        onClick={() => executeCommand('insertUnorderedList')}
                        title="Bullet list"
                    >
                        <List className="w-4 h-4" />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => executeCommand('insertOrderedList')}
                        title="Numbered list"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </ToolbarButton>

                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    <ToolbarButton
                        onClick={() => setShowLinkInput(v => !v)}
                        title="Insert link"
                    >
                        <Link className="w-4 h-4" />
                    </ToolbarButton>

                    {showLinkInput && (
                        <div className="absolute top-full left-2 mt-2 p-3 bg-white border border-gray-300 rounded shadow-lg z-30">
                            <input
                                type="url"
                                value={linkUrl}
                                onChange={e => setLinkUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-64 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        executeCommand('createLink', linkUrl);
                                        setLinkUrl('');
                                        setShowLinkInput(false);
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Editor */}
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={updateContent}
                    suppressContentEditableWarning
                    data-placeholder="Write job description, responsibilities, requirements, and benefits..."
                    className="
                        w-full min-h-[256px] p-4 text-sm text-gray-900 leading-relaxed
                        focus:outline-none overflow-auto
                        empty:before:content-[attr(data-placeholder)]
                        empty:before:text-gray-400
                        empty:before:pointer-events-none
                    "
                />
            </div>

            {error && (
                <div className="flex items-center gap-1.5 text-red-600 text-sm mt-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

// Main Job Posting Form Component
export default function JobPostingForm() {
    const [formData, setFormData] = useState({
        jobOrGigs: 'Select type',
        jobCategory: 'Select category',
        jobTitle: 'Select or type job title',
        jobType: 'Select job type',
        budget: '',
        experienceLevel: 'Select experience level',
        location: 'Select location',
        description: ''
    });

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [clearEditor, setClearEditor] = useState(0);

    const validateForm = () => {
        const newErrors = {};

        if (formData.jobOrGigs === 'Select type') {
            newErrors.jobOrGigs = 'Please select a type';
        }

        if (formData.jobCategory === 'Select category') {
            newErrors.jobCategory = 'Please select a category';
        }

        if (formData.jobTitle === 'Select or type job title' || !formData.jobTitle.trim()) {
            newErrors.jobTitle = 'Please enter a job title';
        }

        if (formData.jobType === 'Select job type') {
            newErrors.jobType = 'Please select a job type';
        }

        if (!formData.budget.trim()) {
            newErrors.budget = 'Budget is required';
        }

        if (formData.experienceLevel === 'Select experience level') {
            newErrors.experienceLevel = 'Please select experience level';
        }

        if (formData.location === 'Select location') {
            newErrors.location = 'Please select a location';
        }

        if (selectedSkills.length === 0) {
            newErrors.skills = 'Please add at least one skill';
        }

        if (!formData.description.trim() || formData.description === '<br>') {
            newErrors.description = 'Job description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const jobData = {
                jobOrGigs: formData.jobOrGigs,
                jobCategory: formData.jobCategory,
                jobTitle: formData.jobTitle,
                jobType: formData.jobType,
                budget: formData.budget,
                experienceLevel: formData.experienceLevel,
                location: formData.location,
                skills: selectedSkills,
                descriptionHTML: formData.description,
                descriptionText: new DOMParser().parseFromString(formData.description, 'text/html').body.textContent,
            };

            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to post job');
            }

            const result = await response.json();

            console.log('Job posted successfully:', result);
            alert('Job posted successfully! 🎉');

            // Reset form
            setFormData({
                jobOrGigs: 'Select type',
                jobCategory: 'Select category',
                jobTitle: 'Select or type job title',
                jobType: 'Select job type',
                budget: '',
                experienceLevel: 'Select experience level',
                location: 'Select location',
                description: ''
            });
            setSelectedSkills([]);
            setErrors({});

            // Clear the rich text editor
            setClearEditor(prev => prev + 1);

        } catch (error) {
            console.error('Error posting job:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        const confirmCancel = window.confirm('Are you sure you want to cancel? All changes will be lost.');

        if (confirmCancel) {
            setFormData({
                jobOrGigs: 'Select type',
                jobCategory: 'Select category',
                jobTitle: 'Select or type job title',
                jobType: 'Select job type',
                budget: '',
                experienceLevel: 'Select experience level',
                location: 'Select location',
                description: ''
            });
            setSelectedSkills([]);
            setErrors({});

            // Clear the rich text editor
            setClearEditor(prev => prev + 1);
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field when user makes a change
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Post New Job</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>

                        <div className="space-y-5">
                            <Select
                                label="Job or Gigs"
                                value={formData.jobOrGigs}
                                onChange={(val) => updateFormData('jobOrGigs', val)}
                                options={['Job', 'Gigs']}
                                placeholder="Select type"
                                required
                                error={errors.jobOrGigs}
                            />

                            <Select
                                label="Job Category"
                                value={formData.jobCategory}
                                onChange={(val) => updateFormData('jobCategory', val)}
                                options={['Technology & IT', 'Design', 'Marketing', 'Sales', 'Finance', 'Healthcare', 'Education', 'Construction']}
                                placeholder="Select category"
                                required
                                error={errors.jobCategory}
                            />

                            <ComboBox
                                label="Job Title"
                                value={formData.jobTitle}
                                onChange={(val) => updateFormData('jobTitle', val)}
                                options={['UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Product Designer', 'Graphic Designer', 'Product Manager', 'Software Engineer', 'Data Scientist', 'DevOps Engineer']}
                                placeholder="Select or type job title"
                                required
                                error={errors.jobTitle}
                            />

                            <Select
                                label="Job Type"
                                value={formData.jobType}
                                onChange={(val) => updateFormData('jobType', val)}
                                options={['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Internship']}
                                placeholder="Select job type"
                                error={errors.jobType}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Budget<span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₦</span>
                                        <input
                                            type="text"
                                            value={formData.budget}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9,]/g, '');
                                                updateFormData('budget', value);
                                            }}
                                            placeholder="Enter Budget"
                                            className={`w-full h-11 pl-7 pr-3 border rounded-md focus:outline-none focus:ring-1 text-sm transition-all ${errors.budget
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                                }`}
                                            aria-label="Budget amount"
                                        />
                                    </div>
                                    {errors.budget && (
                                        <div className="flex items-center gap-1.5 text-red-600 text-sm mt-1.5">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.budget}</span>
                                        </div>
                                    )}
                                </div>

                                <Select
                                    label="Experience Level"
                                    value={formData.experienceLevel}
                                    onChange={(val) => updateFormData('experienceLevel', val)}
                                    options={['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive']}
                                    placeholder="Select experience level"
                                    required
                                    error={errors.experienceLevel}
                                />
                            </div>

                            <Select
                                label="Location"
                                value={formData.location}
                                onChange={(val) => updateFormData('location', val)}
                                options={['Remote', 'On-site', 'Hybrid', 'Lagos, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria']}
                                placeholder="Select location"
                                required
                                error={errors.location}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Skills Required<span className="text-red-500">*</span>
                                </label>
                                <SkillsSelector
                                    selectedSkills={selectedSkills}
                                    onSkillsChange={(skills) => {
                                        setSelectedSkills(skills);
                                        if (errors.skills) {
                                            setErrors(prev => {
                                                const newErrors = { ...prev };
                                                delete newErrors.skills;
                                                return newErrors;
                                            });
                                        }
                                    }}
                                    error={errors.skills}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Job Description */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit lg:sticky lg:top-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Job Description</h2>

                        <RichTextEditor
                            value={formData.description}
                            onChange={(val) => updateFormData('description', val)}
                            error={errors.description}
                            onClear={clearEditor}
                        />

                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Posting...
                                    </>
                                ) : (
                                    'Post Job'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}