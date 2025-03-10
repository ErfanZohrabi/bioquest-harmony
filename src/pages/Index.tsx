
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import SearchInterface from '@/components/search/SearchInterface';
import SearchResults from '@/components/search/SearchResults';
import { SearchType, SearchResult } from '@/types/search';

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentSearchType, setCurrentSearchType] = useState<SearchType | undefined>(undefined);

  const handleSearch = (query: string, type: SearchType) => {
    setIsSearching(true);
    setCurrentQuery(query);
    setCurrentSearchType(type);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock data for demonstration
      const mockResults: SearchResult[] = [
        {
          id: 'NM_000546.6',
          title: 'TP53 tumor protein p53 [Homo sapiens (human)]',
          description: 'This gene encodes a tumor suppressor protein containing transcriptional activation, DNA binding, and oligomerization domains.',
          type: type,
          source: 'NCBI Gene',
          url: 'https://www.ncbi.nlm.nih.gov/gene/7157',
          matchScore: 0.95,
          date: '2023-06-15'
        },
        {
          id: 'P04637',
          title: 'Cellular tumor antigen p53',
          description: 'Acts as a tumor suppressor in many tumor types; induces growth arrest or apoptosis depending on the physiological circumstances and cell type.',
          type: type,
          source: 'UniProt',
          url: 'https://www.uniprot.org/uniprot/P04637',
          matchScore: 0.92,
          date: '2023-07-22'
        },
        {
          id: '6SHF',
          title: 'p53 tetramerization domain',
          description: 'Crystal structure of the p53 tetramerization domain (residues 325-356) at 1.7 Angstroms resolution.',
          type: type,
          source: 'RCSB PDB',
          url: 'https://www.rcsb.org/structure/6SHF',
          matchScore: 0.89,
          date: '2022-11-08'
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Search Section */}
        <section className="py-16 bg-bio-neutral-50" id="features">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-md bg-bio-blue/10 text-bio-blue text-sm font-medium mb-4">
                Universal Search
              </span>
              <h2 className="section-heading mb-4">
                Search Across Multiple Biological Databases
              </h2>
              <p className="section-description mx-auto">
                BioSearch provides a unified interface to query genes, proteins, sequences,
                and structures across major biological databases.
              </p>
            </div>
            
            <SearchInterface onSearch={handleSearch} />
            
            <SearchResults 
              results={searchResults} 
              loading={isSearching}
              query={currentQuery}
              searchType={currentSearchType}
            />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16" id="about">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-md bg-bio-green/10 text-bio-green text-sm font-medium mb-4">
                Capabilities
              </span>
              <h2 className="section-heading mb-4">
                Advanced Bioinformatics Tools
              </h2>
              <p className="section-description mx-auto">
                BioSearch combines powerful search capabilities with AI-driven analysis and visualization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <FeatureBlock
                title="Interactive Visualizations"
                description="Visualize sequence alignments, protein structures, and gene networks with interactive tools."
                iconClass="bg-purple-100 text-purple-700"
                iconText="VIZ"
              />
              <FeatureBlock
                title="AI Summaries"
                description="Get AI-powered summaries and insights about genes, proteins, and biological mechanisms."
                iconClass="bg-blue-100 text-blue-700"
                iconText="AI"
              />
              <FeatureBlock
                title="BLAST Integration"
                description="Run BLAST searches against comprehensive sequence databases with real-time results."
                iconClass="bg-green-100 text-green-700"
                iconText="B+"
              />
              <FeatureBlock
                title="Data Export"
                description="Export results in multiple formats including FASTA, CSV, JSON, and ready-to-publish figures."
                iconClass="bg-amber-100 text-amber-700"
                iconText="EXP"
              />
              <FeatureBlock
                title="Citation Generator"
                description="Automatically generate citations for databases and resources used in your research."
                iconClass="bg-rose-100 text-rose-700"
                iconText="CIT"
              />
              <FeatureBlock
                title="Research Dashboard"
                description="Save and organize your searches and results in a personalized research dashboard."
                iconClass="bg-indigo-100 text-indigo-700"
                iconText="DB"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-bio-blue to-bio-blue-dark text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Accelerate Your Biological Research?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                BioSearch provides researchers with powerful tools to search, analyze, and visualize biological data from a single interface.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#search" 
                  className="px-8 py-3 bg-white text-bio-blue font-medium rounded-lg hover:bg-bio-blue-light hover:bg-opacity-10 transition-colors duration-300 border border-white/30"
                >
                  Try BioSearch Now
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-3 bg-transparent text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300 border border-white/30"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16" id="contact">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-md bg-bio-neutral-200 text-bio-neutral-800 text-sm font-medium mb-4">
                Get in Touch
              </span>
              <h2 className="section-heading mb-4">
                Contact Us
              </h2>
              <p className="section-description mx-auto">
                Have questions about BioSearch? Want to know more about our platform? Reach out to us.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-bio-neutral-200">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-bio-neutral-800 font-medium mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="bio-input" 
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-bio-neutral-800 font-medium mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="bio-input" 
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-bio-neutral-800 font-medium mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="bio-input" 
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label className="block text-bio-neutral-800 font-medium mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="bio-input resize-none" 
                    placeholder="Tell us what you need..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="bio-button-primary"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface FeatureBlockProps {
  title: string;
  description: string;
  iconClass: string;
  iconText: string;
}

const FeatureBlock = ({ title, description, iconClass, iconText }: FeatureBlockProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-bio-neutral-200 hover:shadow-md transition-shadow duration-300">
      <div className={`h-12 w-12 rounded-lg ${iconClass} flex items-center justify-center font-bold text-sm mb-4`}>
        {iconText}
      </div>
      <h3 className="text-xl font-medium text-bio-neutral-800 mb-2">{title}</h3>
      <p className="text-bio-neutral-500">{description}</p>
    </div>
  );
};

export default Index;
