
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Search, Database, Zap } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0');
        const xOffset = x * speed;
        const yOffset = y * speed;
        (el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      ref={heroRef}
    >
      {/* Background gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-bio-blue/10 rounded-full blur-3xl opacity-70 parallax-element" data-speed="10"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-bio-green/10 rounded-full blur-3xl opacity-70 parallax-element" data-speed="15"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-bio-neutral-200 mb-8 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-bio-green mr-2"></span>
            <span className="text-bio-neutral-600 text-sm font-medium">Universal Biological Data Search Engine</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-bio-neutral-900 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Search, Analyze, and Visualize 
            <span className="bg-gradient-to-r from-bio-blue to-bio-blue-dark bg-clip-text text-transparent"> Biological Data</span>
          </h1>
          
          <p className="mt-6 text-xl text-bio-neutral-600 max-w-3xl animate-fade-in" style={{ animationDelay: '200ms' }}>
            A modern bioinformatics platform combining powerful search capabilities with 
            AI-powered analysis and interactive visualizations
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <a 
              href="#search"
              className="bio-button-primary group"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></span>
              <span className="relative flex items-center">
                Get Started <Search className="ml-2 h-4 w-4" />
              </span>
            </a>
            <a 
              href="#features"
              className="bio-button-secondary"
            >
              Learn More
            </a>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-20 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <FeatureCard 
            icon={<Search className="h-5 w-5" />}
            title="Unified Search"
            description="Search across genes, proteins, sequences, and structures with a single interface"
            delay={0}
          />
          <FeatureCard 
            icon={<Database className="h-5 w-5" />}
            title="Data Integration"
            description="Access data from NCBI, UniProt, PDB, and other major biological databases"
            delay={150}
          />
          <FeatureCard 
            icon={<Zap className="h-5 w-5" />}
            title="AI Analysis"
            description="Get AI-powered summaries and insights about your biological queries"
            delay={300}
          />
        </div>
        
        {/* Visual elements */}
        <div className="absolute top-1/3 left-10 h-40 w-40 opacity-20 parallax-element" data-speed="20">
          <div className="h-full w-full rounded-full border border-bio-blue rotate-45 animate-pulse-subtle"></div>
        </div>
        <div className="absolute bottom-1/4 right-10 h-60 w-60 opacity-20 parallax-element" data-speed="30">
          <div className="h-full w-full rounded-full border border-bio-green -rotate-12 animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-bio-neutral-500 text-sm mb-2">Scroll to explore</span>
        <div className="h-10 w-1 rounded-full bg-bio-neutral-300"></div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <div 
      className="bg-white border border-bio-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="rounded-full bg-bio-blue/10 h-12 w-12 flex items-center justify-center text-bio-blue mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-bio-neutral-800 mb-2">{title}</h3>
      <p className="text-bio-neutral-500">{description}</p>
    </div>
  );
};

export default Hero;
