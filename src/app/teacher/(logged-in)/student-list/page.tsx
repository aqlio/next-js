"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EyeIcon, PencilIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon, Router } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for demonstration
const mockStudents = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 15, grade: 10, email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 16, grade: 11, email: 'jane.smith@example.com' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 14, grade: 9, email: 'bob.johnson@example.com' },
    { id: 4, firstName: 'Alice', lastName: 'Williams', age: 17, grade: 12, email: 'alice.williams@example.com' },
    { id: 5, firstName: 'Charlie', lastName: 'Brown', age: 15, grade: 10, email: 'charlie.brown@example.com' },
    // Add more mock data as needed
]

export default function Component() {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const studentsPerPage = 5
    const router = useRouter();
    // Filter students based on search term
    const filteredStudents = mockStudents.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Paginate students
    const indexOfLastStudent = currentPage * studentsPerPage
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

    const handleViewStudent = (id) => {
        console.log(`View student with id: ${id}`)
        // Implement view logic
    }

    const handleEditStudent = (id) => {
        console.log(`Edit student with id: ${id}`)
        // Implement edit logic
    }

    const handleDeleteStudent = (id) => {
        console.log(`Delete student with id: ${id}`)
        // Implement delete logic
    }

    return (
        <Card className="w-full max-w-4xl mx-auto mt-10">
            <CardHeader>
                <CardTitle>Student List</CardTitle>
                <CardDescription>Manage your tuition academy students</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button onClick={() => router.push('/teacher/add-student')}>Add New Student</Button>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentStudents.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                                    <TableCell>{student.age}</TableCell>
                                    <TableCell>{student.grade}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleViewStudent(student.id)} aria-label={`View ${student.firstName} ${student.lastName}`}>
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleEditStudent(student.id)} aria-label={`Edit ${student.firstName} ${student.lastName}`}>
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteStudent(student.id)} aria-label={`Delete ${student.firstName} ${student.lastName}`}>
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} students
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeftIcon className="h-4 w-4" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}