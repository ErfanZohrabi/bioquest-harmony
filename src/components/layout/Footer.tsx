
import React from 'react';
import { cn } from '@/lib/utils';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-bio-neutral-200 bg-white py-12 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4 animate-fade-in">
              <div className="rounded-lg h-10 w-10 flex items-center justify-center bg-gradient-to-br from-bio-blue to-bio-blue-dark text-white font-bold text-xl mr-3">
                B
              </div>
              <span className="text-bio-neutral-800 font-medium text-xl tracking-tight">
                BioSearch
              </span>
            </div>
            <p className="text-bio-neutral-500 max-w-md">
              A modern bioinformatics platform for searching and analyzing biological data with powerful visualization tools and AI-powered insights.
            </p>
            <div className="flex space-x-4 mt-5">
              <SocialIcon icon={<Github className="h-4 w-4" />} href="#" label="GitHub" />
              <SocialIcon icon={<Twitter className="h-4 w-4" />} href="#" label="Twitter" />
              <SocialIcon icon={<Mail className="h-4 w-4" />} href="#" label="Email" />
            </div>
          </div>

          <div>
            <h3 className="text-bio-neutral-900 font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#search">Search</FooterLink>
              <FooterLink href="#visualization">Visualization</FooterLink>
              <FooterLink href="#ai-summaries">AI Summaries</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-bio-neutral-900 font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-bio-neutral-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-bio-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BioSearch. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#privacy" className="text-bio-neutral-500 hover:text-bio-neutral-700 text-sm">
              Privacy
            </a>
            <a href="#terms" className="text-bio-neutral-500 hover:text-bio-neutral-700 text-sm">
              Terms
            </a>
            <a href="#cookies" className="text-bio-neutral-500 hover:text-bio-neutral-700 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <li>
      <a
        href={href}
        className="text-bio-neutral-500 hover:text-bio-blue transition-colors duration-200"
      >
        {children}
      </a>
    </li>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialIcon = ({ icon, href, label }: SocialIconProps) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-8 w-8 rounded-full bg-bio-neutral-100 hover:bg-bio-neutral-200 flex items-center justify-center text-bio-neutral-600 hover:text-bio-blue transition-colors duration-200"
    >
      {icon}
    </a>
  );
};

export default Footer;
