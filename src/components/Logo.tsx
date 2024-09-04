import { FC } from 'react';
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

interface LogoProps {
  className?: string;
  href?: string;
}

const Logo: FC<LogoProps> = ({ className, href = "/home" }) => {
  return (
    <Link href={href} className={`flex-shrink-0 flex items-center ${className}`}>
      <BookOpen className="h-8 w-8 text-primary" />
      <span className="sr-only">Tuition Academy</span>
    </Link>
  )
};

export default Logo;