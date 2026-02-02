'use client';

import { useState } from 'react'
import MainLayout from '../components/MainLayout'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react'

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1500)
    }

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            value: 'support@placehub.com',
            description: 'We reply within 24 hours',
        },
        {
            icon: Phone,
            title: 'Call Us',
            value: '+91 98765 43210',
            description: 'Mon-Fri, 9am-6pm IST',
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            value: 'Placement Cell, Main Block',
            description: 'Your College Campus',
        },
    ]

    const faqs = [
        {
            question: 'How do I share my interview experience?',
            answer: 'Navigate to "Share Experience" from the navigation menu. Follow the 3-step process: add metadata, describe each round, and upload helpful materials.',
        },
        {
            question: 'Is my identity kept anonymous?',
            answer: 'Yes! You can choose to share experiences anonymously. Your name will not be displayed to other users unless you opt-in.',
        },
        {
            question: 'How can I connect with a mentor?',
            answer: 'Visit the Mentorship page to browse available mentors. Filter by company or skill, and click "Request Session" to connect.',
        },
        {
            question: 'Can I edit my shared experience later?',
            answer: 'Yes, you can edit or delete your experiences anytime from the "My Experiences" section in your profile.',
        },
    ]

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-3">Contact Us</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have questions, feedback, or need support? We're here to help. Reach out to us through any of the channels below.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {contactInfo.map((info) => {
                        const Icon = info.icon
                        return (
                            <div
                                key={info.title}
                                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-all"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                                    <Icon className="text-white" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-1">{info.title}</h3>
                                <p className="text-secondary font-semibold mb-1">{info.value}</p>
                                <p className="text-sm text-gray-500">{info.description}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="text-primary" size={24} />
                            <h2 className="text-2xl font-bold text-primary">Send a Message</h2>
                        </div>

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                                <CheckCircle className="text-green-600" size={20} />
                                <p className="text-green-700 font-medium">Message sent successfully! We'll get back to you soon.</p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                                <AlertCircle className="text-red-600" size={20} />
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help?"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell us more about your query..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* FAQs */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="text-secondary" size={24} />
                            <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="p-4 bg-background rounded-xl">
                                    <h3 className="font-bold text-primary mb-2">{faq.question}</h3>
                                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <p className="text-sm text-gray-700">
                                <strong className="text-primary">Still have questions?</strong> Don't hesitate to reach out! Our team typically responds within 24 hours during business days.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ContactPage
