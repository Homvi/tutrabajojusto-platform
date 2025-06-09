import React, { FormEventHandler, useState } from 'react';
import { useForm } from '@inertiajs/react';
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
import { Button } from '@/Components/ui/button';
import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { PlusCircle, Trash2, X } from 'lucide-react';
import { Separator } from '@/Components/ui/separator';
import { Badge } from '@/Components/ui/badge';

// Define your interfaces with index signatures
interface ExperienceEntry {
    [key: string]: string;
    title: string;
    company: string;
    dates: string;
    description: string;
}

interface EducationEntry {
    [key: string]: string;
    degree: string;
    institution: string;
    year: string;
}

interface JobSeekerProfileData {
    headline?: string;
    summary?: string;
    skills?: string;
    experience?: ExperienceEntry[];
    education?: EducationEntry[];
}

// Define a type for your form data
type FormData = {
    headline: string;
    summary: string;
    skills: string;
    experience: ExperienceEntry[];
    education: EducationEntry[];
};

export default function UpdateJobSeekerProfileForm({
    profileData,
    className = '',
}: {
    profileData?: JobSeekerProfileData;
    className?: string;
}) {
    const initialSkills = profileData?.skills
        ? profileData.skills
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
        : [];
    const [skills, setSkills] = useState<string[]>(initialSkills);
    const [currentSkill, setCurrentSkill] = useState('');

    // Explicitly type the useForm hook with your FormData type
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<FormData>({
            headline: profileData?.headline || '',
            summary: profileData?.summary || '',
            skills: profileData?.skills || '',
            experience: profileData?.experience || [],
            education: profileData?.education || [],
        });

    // Update the skill handlers to use proper types
    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentSkill.trim() !== '') {
            e.preventDefault();
            if (!skills.includes(currentSkill.trim())) {
                const newSkills = [...skills, currentSkill.trim()];
                setSkills(newSkills);
                setData('skills', newSkills.join(', '));
            }
            setCurrentSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        const newSkills = skills.filter((skill) => skill !== skillToRemove);
        setSkills(newSkills);
        setData('skills', newSkills.join(', '));
    };

    // Experience methods with proper typing
    const handleExperienceChange = (
        index: number,
        field: keyof ExperienceEntry,
        value: string
    ) => {
        const newExperience = [...data.experience];
        newExperience[index] = { ...newExperience[index], [field]: value };
        setData('experience', newExperience);
    };

    const addExperienceEntry = () => {
        setData('experience', [
            ...data.experience,
            { title: '', company: '', dates: '', description: '' },
        ]);
    };

    const removeExperienceEntry = (index: number) => {
        setData(
            'experience',
            data.experience.filter((_, i) => i !== index)
        );
    };

    // Education methods with proper typing
    const handleEducationChange = (
        index: number,
        field: keyof EducationEntry,
        value: string
    ) => {
        const newEducation = [...data.education];
        newEducation[index] = { ...newEducation[index], [field]: value };
        setData('education', newEducation);
    };

    const addEducationEntry = () => {
        setData('education', [
            ...data.education,
            { degree: '', institution: '', year: '' },
        ]);
    };

    const removeEducationEntry = (index: number) => {
        setData(
            'education',
            data.education.filter((_, i) => i !== index)
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), { preserveScroll: true });
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
                <CardDescription>
                    Update your professional information to help companies get
                    to know you better.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    {/* Headline */}
                    <div>
                        <Label htmlFor="headline">Headline</Label>
                        <Input
                            id="headline"
                            value={data.headline}
                            onChange={(e) =>
                                setData('headline', e.target.value)
                            }
                            placeholder="e.g., Senior Laravel Developer | React Enthusiast"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.headline}
                        />
                    </div>

                    {/* Summary */}
                    <div>
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea
                            id="summary"
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                            rows={4}
                            placeholder="A brief summary about your professional background."
                        />
                        <InputError className="mt-2" message={errors.summary} />
                    </div>

                    {/* Skills */}
                    <div>
                        <Label htmlFor="skills">Skills</Label>
                        <div className="flex flex-wrap gap-2 items-center p-2 border rounded-md mt-1">
                            {skills.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                >
                                    {skill}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => handleRemoveSkill(skill)}
                                    />
                                </Badge>
                            ))}
                            <Input
                                id="skills-input"
                                className="flex-grow border-none focus-visible:ring-0 shadow-none p-0 h-auto"
                                value={currentSkill}
                                onChange={(e) =>
                                    setCurrentSkill(e.target.value)
                                }
                                onKeyDown={handleAddSkill}
                                placeholder="Add a skill and press Enter"
                            />
                        </div>
                        <InputError className="mt-2" message={errors.skills} />
                    </div>

                    <Separator />

                    {/* Work Experience */}
                    <div>
                        <h3 className="text-lg font-medium">Work Experience</h3>
                        <div className="space-y-4 mt-2">
                            {data.experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="p-4 border rounded-lg space-y-2 relative"
                                >
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 h-7 w-7"
                                        onClick={() =>
                                            removeExperienceEntry(index)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                    <Input
                                        placeholder="Job Title"
                                        value={exp.title}
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                index,
                                                'title',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        placeholder="Company Name"
                                        value={exp.company}
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                index,
                                                'company',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        placeholder="Dates (e.g., Jan 2020 - Present)"
                                        value={exp.dates}
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                index,
                                                'dates',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Textarea
                                        placeholder="Description of your role and accomplishments..."
                                        value={exp.description}
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                index,
                                                'description',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addExperienceEntry}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" /> Add
                                Experience
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Education */}
                    <div>
                        <h3 className="text-lg font-medium">Education</h3>
                        <div className="space-y-4 mt-2">
                            {data.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="p-4 border rounded-lg space-y-2 relative"
                                >
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 h-7 w-7"
                                        onClick={() =>
                                            removeEducationEntry(index)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                    <Input
                                        placeholder="Degree or Certification"
                                        value={edu.degree}
                                        onChange={(e) =>
                                            handleEducationChange(
                                                index,
                                                'degree',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        placeholder="Institution Name"
                                        value={edu.institution}
                                        onChange={(e) =>
                                            handleEducationChange(
                                                index,
                                                'institution',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        placeholder="Year of Completion"
                                        value={edu.year}
                                        onChange={(e) =>
                                            handleEducationChange(
                                                index,
                                                'year',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addEducationEntry}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" /> Add
                                Education
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <Button disabled={processing}>Save Profile</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
