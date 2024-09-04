"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/store/authSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';






export default function Login() {
	
	
	
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();
	const { isLoading, error } = useAppSelector((state) => state.auth);







	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const resultAction = await dispatch(loginUser({ email, password }));
		if (loginUser.fulfilled.match(resultAction)) {
			router.push('/home');
		}
	};






	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white rounded shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6">Teacher Login</h2>
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}
				<form onSubmit={handleLogin} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="email" className="text-sm font-medium">Email</label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="password" className="text-sm font-medium">Password</label>
						<Input
							id="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? 'Logging in...' : 'Login'}
					</Button>
				</form>
			</div>
		</div>
	);
}