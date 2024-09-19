import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">My Academy</h3>
            <p className="text-muted-foreground">
              Empowering education through innovative management solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-muted-foreground mb-2">Follow us on social media:</p>
            <div className="flex space-x-4">
              {/* Add your social media icons/links here */}
              <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} My Academy. All rights reserved.</p>
          <p className="mt-2">
            My Academy is owned and operated by{' '}
            <a href="https://www.aqlio.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              aqlio.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;