"use client";

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchClasses } from '@/store/classSlice';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ClassListPage() {
	const dispatch = useAppDispatch();
	const { classes, isLoading, error } = useAppSelector((state) => state.class);

	useEffect(() => {
		dispatch(fetchClasses());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Class List</h1>
			{classes.map((classItem) => (
				<Card key={classItem.id} className="mb-4">
					<CardHeader>
						<CardTitle>{classItem.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<p><strong>Schedule:</strong> {classItem.schedule}</p>
						<p><strong>Capacity:</strong> {classItem.capacity}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}