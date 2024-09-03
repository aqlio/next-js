"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function AddStudent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        grade: '',
        email: '',
        phone: '',
        address: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData)
        // Reset form after submission
        setFormData({
            firstName: '',
            lastName: '',
            age: '',
            grade: '',
            email: '',
            phone: '',
            address: ''
        })
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-10">





            <CardHeader>
                <CardTitle>Add New Student</CardTitle>
                <CardDescription>Enter the details of the new student for your tuition academy.</CardDescription>
            </CardHeader>
            
            
            
            
            
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    
                    
                    
                    
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" placeholder="John" value={formData.firstName}
                                onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" placeholder="Doe" value={formData.lastName}
                                onChange={handleChange} required />
                        </div>


                    </div>







                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" name="age" type="number" placeholder="15" value={formData.age}
                                onChange={handleChange} required />
                        </div>




                        <div className="space-y-2">
                            <Label htmlFor="grade">Grade</Label>
                            <Select name="grade" onValueChange={(value) => handleChange({ target: { name: 'grade', value } })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                                        <SelectItem key={grade} value={grade.toString()}>{grade}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                    </div>





                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={formData.email}
                            onChange={handleChange} required />
                    </div>






                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="123-456-7890" value={formData.phone}
                            onChange={handleChange} required />
                    </div>






                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" name="address" placeholder="Enter student's address" value={formData.address}
                            onChange={handleChange} required />
                    </div>







                </CardContent>






                <CardFooter>
                    <Button type="submit" className="w-full">Add Student</Button>
                </CardFooter>





            </form>
        </Card>
    )
}