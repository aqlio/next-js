import { FC } from 'react';
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

interface LogoProps {
  className?: string;
  href?: string;
}

const Logo: FC<LogoProps> = ({ className, href = "/home" }) => {
  return (
    <Link href={href} className={`flex items-center ${className}`}>
      <BookOpen className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold ml-2">My Academy</span>
    </Link>
  )
};

export default Logo;