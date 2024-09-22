"use client"

import 'reflect-metadata';
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DollarSign, BarChart2, TrendingUp, UserCheck, Menu } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import LoggedOutHeader from '@/components/Headers/LoggedOutHeader'


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const FeatureCard = ({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) => (
    <Card>
      <CardHeader>
        <Icon className="h-8 w-8 mb-2 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>My Academy: Efficient Academy Management Software</title>
        <meta name="description" content="My Academy, owned by aqlio.com, simplifies academy management for small to medium institutions. Manage fees, track attendance, analyze performance, and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <LoggedOutHeader />



      <main className="flex-grow">
        <section className="bg-muted py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Simplify Your Academy Management</h1>
            <p className="text-xl text-muted-foreground mb-8">Streamline operations, boost efficiency, and focus on what matters most - education.</p>
            <Button size="lg" asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={DollarSign}
                title="Fee Management"
                description="Manage fees online, support various payment methods, track payments, and send reminders."
              />
              <FeatureCard
                icon={BarChart2}
                title="Smart Dashboards"
                description="Prioritize tasks based on upcoming exams and tests for each student."
              />
              <FeatureCard
                icon={TrendingUp}
                title="Performance Analysis"
                description="Track common exam topics and prioritize teaching accordingly."
              />
              <FeatureCard
                icon={UserCheck}
                title="Attendance Tracking"
                description="Use QR scanning or manual input for easy attendance management."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">&copy; 2024 My Academy. All rights reserved.</p>
          <p className="text-muted-foreground mt-2">
            My Academy is owned and operated by{' '}
            <a href="https://www.aqlio.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              aqlio.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}