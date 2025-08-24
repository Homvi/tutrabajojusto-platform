import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useTranslation } from '@/hooks/useTranslation';

export default function TermsOfService() {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title="Terms of Service" />
            
            <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-neutral-950 shadow-lg rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            {t('Terms of Service')}
                        </h1>
                        
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    1. Acceptance of Terms
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    By accessing and using TuTrabajoJusto, you accept and agree to be bound by the terms and provision of this agreement.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    2. Use License
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Permission is granted to temporarily download one copy of the materials (information or software) on TuTrabajoJusto for personal, non-commercial transitory viewing only.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                                    <li>modify or copy the materials;</li>
                                    <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial);</li>
                                    <li>attempt to decompile or reverse engineer any software contained on TuTrabajoJusto;</li>
                                    <li>remove any copyright or other proprietary notations from the materials;</li>
                                    <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                                </ul>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    3. Disclaimer
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    The materials on TuTrabajoJusto are provided on an 'as is' basis. TuTrabajoJusto makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    4. Limitations
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    In no event shall TuTrabajoJusto or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TuTrabajoJusto, even if TuTrabajoJusto or a TuTrabajoJusto authorized representative has been notified orally or in writing of the possibility of such damage.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    5. Accuracy of Materials
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    The materials appearing on TuTrabajoJusto could include technical, typographical, or photographic errors. TuTrabajoJusto does not warrant that any of the materials on its website are accurate, complete or current. TuTrabajoJusto may make changes to the materials contained on its website at any time without notice.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    6. Links
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    TuTrabajoJusto has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TuTrabajoJusto of the site. Use of any such linked website is at the user's own risk.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    7. Modifications
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    TuTrabajoJusto may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
                                </p>
                            </section>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                    8. Governing Law
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
