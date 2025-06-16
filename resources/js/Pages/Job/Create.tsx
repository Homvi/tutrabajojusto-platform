import React, { FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import InputError from '@/Components/InputError';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        responsibilities: '',
        qualifications: '',
        type: 'on-site',
        location: '',
        remote_policy: '',
        employment_type: 'full-time',
        start_date: '',
        salary_min: 0, // This will now store cents
        salary_currency: 'EUR',
        salary_period: 'yearly',
        application_deadline: '',
        interview_rounds: '',
        application_process_duration: '',
    });

    // State to manage the salary input in Euros for a better UX
    const [salaryInEuros, setSalaryInEuros] = useState('');

    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const euroValue = e.target.value;
        setSalaryInEuros(euroValue);
        // Convert to cents for the form data
        setData(
            'salary_min',
            euroValue ? Math.round(parseFloat(euroValue) * 100) : 0
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('jobs.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Post a New Job Offer
                    </h2>
                    <Link href={route('dashboard')}>
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Post a New Job" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                            <CardDescription>
                                Fill out the form below to create a new job
                                posting on the platform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                {/* Job Title */}
                                <div>
                                    <Label htmlFor="title">Job Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Description, Responsibilities, Qualifications */}
                                <div>
                                    <Label htmlFor="description">
                                        Job Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        placeholder="Provide a general summary of the role."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="responsibilities">
                                        Key Responsibilities
                                    </Label>
                                    <Textarea
                                        id="responsibilities"
                                        value={data.responsibilities}
                                        onChange={(e) =>
                                            setData(
                                                'responsibilities',
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        placeholder="List the main tasks and duties."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="qualifications">
                                        Qualifications
                                    </Label>
                                    <Textarea
                                        id="qualifications"
                                        value={data.qualifications}
                                        onChange={(e) =>
                                            setData(
                                                'qualifications',
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        placeholder="List required skills, experience, and education."
                                    />
                                </div>

                                {/* Work Type and Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="type">Work Type</Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setData('type', value)
                                            }
                                            defaultValue={data.type}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select work type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="on-site">
                                                    On-Site
                                                </SelectItem>
                                                <SelectItem value="hybrid">
                                                    Hybrid
                                                </SelectItem>
                                                <SelectItem value="remote">
                                                    Remote
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="location">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) =>
                                                setData(
                                                    'location',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., Madrid, Spain"
                                        />
                                    </div>
                                </div>

                                {/* Remote Policy (Conditional) */}
                                {data.type === 'remote' && (
                                    <div>
                                        <Label htmlFor="remote_policy">
                                            Remote Policy
                                        </Label>
                                        <Input
                                            id="remote_policy"
                                            value={data.remote_policy}
                                            onChange={(e) =>
                                                setData(
                                                    'remote_policy',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., EU Only, Worldwide"
                                        />
                                    </div>
                                )}

                                {/* Employment Type and Start Date */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="employment_type">
                                            Employment Type
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setData(
                                                    'employment_type',
                                                    value
                                                )
                                            }
                                            defaultValue={data.employment_type}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select employment type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="full-time">
                                                    Full-Time
                                                </SelectItem>
                                                <SelectItem value="part-time">
                                                    Part-Time
                                                </SelectItem>
                                                <SelectItem value="contract">
                                                    Contract
                                                </SelectItem>
                                                <SelectItem value="internship">
                                                    Internship
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="start_date">
                                            Planned Start Date
                                        </Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) =>
                                                setData(
                                                    'start_date',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Salary Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="salary_min">
                                            Minimum Salary (in Euros)
                                        </Label>
                                        <Input
                                            id="salary_min"
                                            type="number"
                                            value={salaryInEuros}
                                            onChange={handleSalaryChange}
                                            placeholder="e.g., 50000"
                                            required
                                        />
                                        <InputError
                                            message={errors.salary_min}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="salary_period">
                                            Salary Period
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setData('salary_period', value)
                                            }
                                            defaultValue={data.salary_period}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yearly">
                                                    Yearly
                                                </SelectItem>
                                                <SelectItem value="monthly">
                                                    Monthly
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Application Process Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <Label htmlFor="application_deadline">
                                            Application Deadline
                                        </Label>
                                        <Input
                                            id="application_deadline"
                                            type="date"
                                            value={data.application_deadline}
                                            onChange={(e) =>
                                                setData(
                                                    'application_deadline',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="interview_rounds">
                                            Interview Rounds
                                        </Label>
                                        <Input
                                            id="interview_rounds"
                                            value={data.interview_rounds}
                                            onChange={(e) =>
                                                setData(
                                                    'interview_rounds',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., 2-3"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="application_process_duration">
                                            Process Duration
                                        </Label>
                                        <Input
                                            id="application_process_duration"
                                            value={
                                                data.application_process_duration
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'application_process_duration',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., 2-3 weeks"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button disabled={processing}>
                                        Post Job Offer
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
