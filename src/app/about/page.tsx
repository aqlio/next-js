"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>About My Academy</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        My Academy is an innovative tuition academy management software designed to streamline operations for small to medium-sized educational institutions. Our platform empowers teachers and administrators to focus on what matters most - education.
                    </p>
                    <p className="mb-4">
                        Key features of My Academy include:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>Efficient student management</li>
                        <li>Class scheduling and organization</li>
                        <li>Attendance tracking</li>
                        <li>Performance analysis tools</li>
                        <li>Fee management system</li>
                    </ul>
                    <p>
                        Developed by aqlio.com, My Academy is committed to enhancing the educational experience for both educators and students alike.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}