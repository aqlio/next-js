"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PencilIcon, TrashIcon } from 'lucide-react'

// Mock data for initial classes
const initialClasses = [
    { id: 1, name: 'Mathematics 101', schedule: 'Mon, Wed, Fri 9:00 AM', capacity: 20 },
    { id: 2, name: 'English Literature', schedule: 'Tue, Thu 2:00 PM', capacity: 15 },
    { id: 3, name: 'Physics Advanced', schedule: 'Mon, Thu 11:00 AM', capacity: 18 },
]

export default function Component() {
    const [classes, setClasses] = useState(initialClasses)
    const [newClass, setNewClass] = useState({ name: '', schedule: '', capacity: '' })
    const [editingClass, setEditingClass] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (editingClass) {
            setEditingClass({ ...editingClass, [name]: value })
        } else {
            setNewClass({ ...newClass, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingClass) {
            setClasses(classes.map(c => c.id === editingClass.id ? editingClass : c))
            setEditingClass(null)
        } else {
            const id = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1
            setClasses([...classes, { ...newClass, id }])
            setNewClass({ name: '', schedule: '', capacity: '' })
        }
    }

    const handleEdit = (classItem) => {
        setEditingClass(classItem)
        setNewClass({ name: '', schedule: '', capacity: '' })
    }

    const handleDelete = (id) => {
        setClasses(classes.filter(c => c.id !== id))
    }

    const handleCancelEdit = () => {
        setEditingClass(null)
        setNewClass({ name: '', schedule: '', capacity: '' })
    }

    return (
        <div className="w-full max-w-2xl container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Class Management</h1>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{editingClass ? 'Edit Class' : 'Create New Class'}</CardTitle>
                        <CardDescription>
                            {editingClass ? 'Modify the details of the existing class.' : 'Add a new class to your tuition academy.'}
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Class Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={editingClass ? editingClass.name : newClass.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Mathematics 101"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="schedule">Schedule</Label>
                                <Input
                                    id="schedule"
                                    name="schedule"
                                    value={editingClass ? editingClass.schedule : newClass.schedule}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Mon, Wed, Fri 9:00 AM"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="capacity">Capacity</Label>
                                <Input
                                    id="capacity"
                                    name="capacity"
                                    type="number"
                                    value={editingClass ? editingClass.capacity : newClass.capacity}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 20"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="submit">{editingClass ? 'Update Class' : 'Create Class'}</Button>
                            {editingClass && (
                                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                    Cancel Edit
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}