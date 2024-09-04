import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome to EduExcel Academy</h1>
                <p className="text-xl text-muted-foreground">Empowering teachers to inspire and educate</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">56</div>
                        <p className="text-xs text-muted-foreground">+2 new classes this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">In the next 24 hours</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">+5% from last semester</p>
                    </CardContent>
                </Card>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Access frequently used features</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <Link href="/add-student">
                            <Button className="w-full">
                                <Users className="mr-2 h-4 w-4" />
                                Add Student
                            </Button>
                        </Link>
                        <Link href="/add-classes">
                            <Button className="w-full">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Create Class
                            </Button>
                        </Link>
                        <Link href="/students">
                            <Button className="w-full" variant="outline">
                                <Users className="mr-2 h-4 w-4" />
                                View Students
                            </Button>
                        </Link>
                        <Link href="/classes">
                            <Button className="w-full" variant="outline">
                                <BookOpen className="mr-2 h-4 w-4" />
                                View Classes
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Updates</CardTitle>
                        <CardDescription>Stay informed about the latest changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                <span className="flex-grow">New student enrollment feature added</span>
                                <span className="text-sm text-muted-foreground">2d ago</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                <span className="flex-grow">Performance tracking system updated</span>
                                <span className="text-sm text-muted-foreground">5d ago</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                <span className="flex-grow">Upcoming maintenance scheduled for next week</span>
                                <span className="text-sm text-muted-foreground">1w ago</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

            <section className="text-center">
                <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                <p className="mb-4">Our support team is always ready to assist you.</p>
                <Button variant="secondary">Contact Support</Button>
            </section>
        </div>
    )
}