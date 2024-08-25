"use client";

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for classes
const initialClasses = [
    { id: 1, name: 'Mathematics 101', schedule: 'Mon, Wed, Fri 9:00 AM', capacity: 20 },
    { id: 2, name: 'English Literature', schedule: 'Tue, Thu 2:00 PM', capacity: 15 },
    { id: 3, name: 'Physics Advanced', schedule: 'Mon, Thu 11:00 AM', capacity: 18 },
    { id: 4, name: 'Chemistry Lab', schedule: 'Wed, Fri 3:00 PM', capacity: 12 },
    { id: 5, name: 'History of Art', schedule: 'Tue, Thu 10:00 AM', capacity: 25 },
    { id: 6, name: 'Computer Science Basics', schedule: 'Mon, Wed 1:00 PM', capacity: 22 },
]

export default function Component() {
    const [classes, setClasses] = useState(initialClasses)
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const filteredClasses = classes.filter(classItem =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="w-full max-w-2xl container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Classes</h1>
            <div className="flex justify-between items-center mb-6">
                <Input
                    className="max-w-sm"
                    placeholder="Search classes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => router.push('/teacher/add-class')}>
                    <PlusCircle className="mr-2 h-4 w-4"/> Add New Class
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredClasses.map((classItem) => (
                    <Card
                        key={classItem.id}
                        className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    >
                        <CardContent className="p-6 h-48 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                                    {classItem.name}
                                </h2>
                                <p className="text-muted-foreground text-sm">{classItem.schedule}</p>
                            </div>
                            <div className="flex justify-end items-end">
                                <span className="text-sm font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                    Strength: {classItem.capacity}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {filteredClasses.length === 0 && (
                <p className="text-center text-muted-foreground mt-8">No classes found. Try adjusting your search.</p>
            )}
        </div>
    )
}