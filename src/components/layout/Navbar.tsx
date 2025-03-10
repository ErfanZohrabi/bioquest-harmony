
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out glass-nav',
        {
          'py-4': !isScrolled,
          'py-3 shadow-sm': isScrolled,
        }
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center group"
        >
          <div className="rounded-lg h-10 w-10 flex items-center justify-center bg-gradient-to-br from-bio-blue to-bio-blue-dark text-white font-bold text-xl mr-3">
            B
          </div>
          <span className="text-bio-neutral-800 font-medium text-xl tracking-tight group-hover:text-bio-blue transition-colors duration-200">
            BioSearch
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#search">Search</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-bio-neutral-700 hover:text-bio-neutral-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 top-[57px] bg-white/95 backdrop-blur-md border-b border-bio-neutral-200 shadow-lg transition-transform duration-300 ease-in-out',
          {
            'translate-y-0': isMenuOpen,
            '-translate-y-full': !isMenuOpen,
          }
        )}
      >
        <div className="container-custom py-5 flex flex-col space-y-3">
          <MobileNavLink href="#features" onClick={() => setIsMenuOpen(false)}>Features</MobileNavLink>
          <MobileNavLink href="#search" onClick={() => setIsMenuOpen(false)}>Search</MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <a
      href={href}
      className="relative px-4 py-2 text-bio-neutral-700 font-medium transition-colors duration-200 rounded-md hover:text-bio-blue hover:bg-bio-blue/5 group"
    >
      {children}
      <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-bio-blue transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/3" />
    </a>
  );
};

interface MobileNavLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink = ({ href, onClick, children }: MobileNavLinkProps) => {
  return (
    <a
      href={href}
      className="flex items-center justify-between px-4 py-3 text-bio-neutral-800 font-medium hover:bg-bio-blue/5 hover:text-bio-blue rounded-lg transition-colors duration-200"
      onClick={onClick}
    >
      {children}
      <ChevronDown className="h-4 w-4" />
    </a>
  );
};

export default Navbar;
