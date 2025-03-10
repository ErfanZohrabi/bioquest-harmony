
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, ChevronDown, AlertCircle } from 'lucide-react';
import { SearchType } from '@/types/search';
import Button from '@/components/ui/custom/Button';

const searchTypes: { value: SearchType; label: string }[] = [
  { value: 'gene', label: 'Gene' },
  { value: 'protein', label: 'Protein' },
  { value: 'sequence', label: 'Sequence' },
  { value: 'pdb', label: 'Structure (PDB)' },
  { value: 'blast', label: 'BLAST Search' }
];

interface SearchInterfaceProps {
  onSearch?: (query: string, type: SearchType) => void;
}

const SearchInterface = ({ onSearch }: SearchInterfaceProps) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('gene');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      if (onSearch) {
        onSearch(query.trim(), searchType);
      }
      
      setLoading(false);
      console.log(`Searching for: ${query} (Type: ${searchType})`);
    }, 800);
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case 'gene': 
        return 'Enter gene name or ID (e.g., BRCA1, TP53)';
      case 'protein':
        return 'Enter protein name or accession (e.g., P53_HUMAN)';
      case 'sequence':
        return 'Enter DNA/RNA/Protein sequence or identifier';
      case 'pdb':
        return 'Enter PDB ID or molecule name (e.g., 1ABC)';
      case 'blast':
        return 'Paste FASTA sequence for BLAST search';
      default:
        return 'Search biological data...';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto" id="search">
      <div className="bg-white shadow-md rounded-2xl p-6 border border-bio-neutral-200">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col space-y-6">
            {/* Search type selector */}
            <div className="relative">
              <label className="text-bio-neutral-800 font-medium mb-1 block">
                Search Type
              </label>
              <button
                type="button"
                className="w-full text-left flex items-center justify-between border border-bio-neutral-200 rounded-lg px-4 py-3 bg-white hover:bg-bio-neutral-50 transition-colors duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="font-medium text-bio-neutral-800">
                  {searchTypes.find(t => t.value === searchType)?.label}
                </span>
                <ChevronDown className={cn(
                  "h-5 w-5 text-bio-neutral-500 transition-transform duration-200",
                  isDropdownOpen ? "transform rotate-180" : ""
                )} />
              </button>
              
              {/* Dropdown menu */}
              <div className={cn(
                "absolute z-10 mt-1 w-full bg-white border border-bio-neutral-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top",
                isDropdownOpen 
                  ? "transform scale-y-100 opacity-100" 
                  : "transform scale-y-0 opacity-0 pointer-events-none"
              )}>
                <div className="py-1">
                  {searchTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className={cn(
                        "w-full text-left px-4 py-2.5 hover:bg-bio-neutral-50 transition-colors duration-200",
                        type.value === searchType 
                          ? "bg-bio-blue/5 text-bio-blue" 
                          : "text-bio-neutral-800"
                      )}
                      onClick={() => {
                        setSearchType(type.value);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Search input */}
            <div>
              <label className="text-bio-neutral-800 font-medium mb-1 block" htmlFor="search-query">
                Search Query
              </label>
              <div className="relative">
                <input
                  id="search-query"
                  type="text"
                  className={cn(
                    "bio-input pr-10",
                    error ? "border-destructive focus:ring-destructive/20" : ""
                  )}
                  placeholder={getPlaceholder()}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (error) setError(null);
                  }}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-bio-neutral-400" />
              </div>
              {error && (
                <div className="mt-2 flex items-center text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}
              {searchType === 'blast' && (
                <div className="mt-2 text-bio-neutral-500 text-sm">
                  For BLAST search, paste a sequence in FASTA format or plain sequence.
                </div>
              )}
            </div>
            
            {/* Search button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={<Search className="h-5 w-5" />}
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Search tips */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchTip
          title="Gene Search"
          description="Search by gene symbol, name, or ID from major databases like NCBI Gene or Ensembl."
        />
        <SearchTip
          title="Protein Search"
          description="Find proteins by name, accession number, or functional domain from UniProt, PDB, and more."
        />
        <SearchTip
          title="Sequence Analysis"
          description="Paste DNA, RNA, or protein sequences to find matches or run BLAST searches against databases."
        />
      </div>
    </div>
  );
};

interface SearchTipProps {
  title: string;
  description: string;
}

const SearchTip = ({ title, description }: SearchTipProps) => {
  return (
    <div className="bg-bio-blue/5 border border-bio-blue/20 rounded-lg p-4">
      <h4 className="text-bio-blue font-medium mb-1">{title}</h4>
      <p className="text-bio-neutral-700 text-sm">{description}</p>
    </div>
  );
};

export default SearchInterface;
