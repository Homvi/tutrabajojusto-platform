import React from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    ClipboardList,
    Building,
    Users,
    Briefcase, // Alternative for companies
    UserPlus, // Alternative for job seekers
} from 'lucide-react';
import { Button } from '@/Components/ui/button'; // Adjusted path
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'; // Adjusted path
import { Separator } from '@/Components/ui/separator'; // Adjusted path
import Logo from '@/Components/Logo';

import { router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useTranslation } from '@/hooks/useTranslation';
const navigateTo = (url: string) => router.visit(url);

// Animation variants from your style guide
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// Features for TuTrabajoJusto based on MVP
const mvpFeatures = [
    {
        icon: DollarSign,
        title: 'Real and Transparent Salaries',
        description:
            'All offers show the exact salary. No beating around the bush, no wasting time.',
    },
    {
        icon: ClipboardList,
        title: 'Structured Profiles, Goodbye CV',
        description:
            'Create your profile once and apply with a click. Companies see your key information, no CVs needed.',
    },
    {
        icon: Building,
        title: 'Validated Companies',
        description:
            'We only connect with verified companies that are serious about finding talent and offer fair conditions.',
    },
    {
        icon: Users,
        title: 'Direct and Agile Connection',
        description:
            'Simplified application process for an efficient meeting between talent and opportunity.',
    },
];


const LandingPage: React.FC = () => {

    const { t: __ } = useTranslation();

    return (
        <GuestLayout>
            <motion.section
                className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30 dark:to-secondary/10 px-6 py-12 text-center md:py-20"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div
                    variants={itemVariants}
                    className="z-10 mb-6 md:mb-8"
                >
                    {/* Responsive Logo */}
                    <div className="hidden sm:block">
                        <Logo width={400} height={150} />{' '}
                        {/* Adjust size as needed */}
                    </div>
                    <div className="block sm:hidden">
                        <Logo width={200} height={100} />{' '}
                        {/* Adjust size as needed */}
                    </div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="mb-6 max-w-5xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
                    data-testid="hero-title"
                >
                    <span className="text-primary">{__('Clear Salaries')}</span>
                    ,{__('Real Connections.')}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mb-8 max-w-xl text-lg font-medium text-muted-foreground sm:text-xl md:text-2xl"
                >
                    {__('Your time is valuable. Say goodbye to misleading offers and a lack of communication.')}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="z-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6"
                >
                    <Button
                        size="lg"
                        onClick={() => navigateTo('/register-job-seeker')} // Replace with your Inertia route
                        className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                    >
                        <UserPlus className="mr-2 h-5 w-5" /> {__("I'm a Candidate")}
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigateTo('/register-company')} // Replace with your Inertia route
                        className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10 hover:text-primary"
                    >
                        <Briefcase className="mr-2 h-5 w-5" /> {__("I'm a Company")}
                    </Button>
                </motion.div>
            </motion.section>

            <Separator />

            {/* Features Section */}
            <motion.section
                className="container mx-auto max-w-5xl px-6 py-16 md:py-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.h2
                    variants={itemVariants}
                    className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                >
                    Un portal de empleo{' '}
                    <span className="text-primary">construido para ti</span>
                </motion.h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {mvpFeatures.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full text-center transition-all hover:shadow-lg hover:border-primary/70 dark:hover:border-primary/70 bg-card">
                                <CardHeader className="items-center">
                                    {' '}
                                    {/* items-center to center icon wrapper */}
                                    <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary">
                                        <feature.icon className="h-7 w-7 md:h-8 md:w-8" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm md:text-base">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Footer now provided by layout */}
        </GuestLayout>
    );
};

export default LandingPage;
