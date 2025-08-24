import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useTranslation } from '@/hooks/useTranslation';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title="Privacy Policy" />
            
            <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-neutral-950 shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            {t('Privacy Policy')}
                        </h1>
                        
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    1. Information We Collect
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We collect information you provide directly to us, such as when you create an account, submit a job application, or contact us for support.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    The types of information we may collect include:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                                    <li>Name, email address, and contact information</li>
                                    <li>Professional information such as work history, skills, and education</li>
                                    <li>Company information for employers</li>
                                    <li>Job application materials and communications</li>
                                    <li>Usage data and analytics</li>
                                </ul>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    2. How We Use Your Information
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                                    <li>Provide, maintain, and improve our services</li>
                                    <li>Process job applications and connect job seekers with employers</li>
                                    <li>Send you technical notices, updates, and support messages</li>
                                    <li>Respond to your comments, questions, and customer service requests</li>
                                    <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                                    <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                                </ul>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    3. Information Sharing
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                                    <li>With your explicit consent</li>
                                    <li>To comply with legal obligations</li>
                                    <li>To protect our rights, property, or safety</li>
                                    <li>In connection with a business transfer or merger</li>
                                    <li>With service providers who assist us in operating our platform</li>
                                </ul>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    4. Data Security
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    5. Cookies and Tracking Technologies
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We use cookies and similar tracking technologies to enhance your experience on our platform, analyze usage patterns, and personalize content. You can control cookie settings through your browser preferences.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    6. Your Rights
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Depending on your location, you may have certain rights regarding your personal information, including:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                                    <li>The right to access and receive a copy of your personal information</li>
                                    <li>The right to rectify or update your personal information</li>
                                    <li>The right to delete your personal information</li>
                                    <li>The right to restrict or object to processing</li>
                                    <li>The right to data portability</li>
                                    <li>The right to withdraw consent</li>
                                </ul>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    7. Data Retention
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    8. Children's Privacy
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Our services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    9. Changes to This Policy
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    10. Contact Us
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    If you have any questions about this privacy policy or our data practices, please contact us at:
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Email: adam@tutrabajojusto.es
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
